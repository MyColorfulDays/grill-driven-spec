import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message) {
  errors.push(message);
}

function assertExists(relativePath) {
  if (!exists(relativePath)) {
    fail(`Missing required file: ${relativePath}`);
  }
}

function assertIncludes(file, needle) {
  const text = readText(file);
  if (!text.includes(needle)) {
    fail(`${file} does not mention ${needle}`);
  }
}

function headingAnchor(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function anchorsForMarkdown(file) {
  const anchors = new Set();
  for (const line of readText(file).split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (match) {
      anchors.add(headingAnchor(match[2]));
    }
  }
  return anchors;
}

function assertMarkdownFragments(file) {
  const text = readText(file);
  const linkPattern = /`?([A-Za-z0-9_./-]+\.md)#([A-Za-z0-9_-]+)`?/g;
  const cache = new Map();
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    const targetFile = match[1];
    const fragment = match[2];

    if (!exists(targetFile)) {
      fail(`${file} links to missing markdown file: ${targetFile}`);
      continue;
    }

    if (!cache.has(targetFile)) {
      cache.set(targetFile, anchorsForMarkdown(targetFile));
    }

    if (!cache.get(targetFile).has(fragment)) {
      fail(`${file} links to missing markdown anchor: ${targetFile}#${fragment}`);
    }
  }
}

function slugFromPath(relativePath) {
  return path.basename(relativePath, path.extname(relativePath));
}

const requiredFiles = [
  "SKILL.md",
  "README.md",
  "SECURITY.md",
  "references/state-machine.md",
  "references/path-guides.md",
  "references/prompts.md",
  "references/file-skeletons.md",
  "references/helper-capabilities.md",
  "references/review-checklist.md",
  "scenarios/README.md"
];

for (const file of requiredFiles) {
  assertExists(file);
}

if (errors.length === 0) {
  for (const file of [
    "references/state-machine.md",
    "references/path-guides.md",
    "references/prompts.md",
    "references/file-skeletons.md",
    "references/helper-capabilities.md",
    "references/review-checklist.md"
  ]) {
    assertIncludes("SKILL.md", file);
    assertIncludes("README.md", file);
  }
  assertIncludes("README.md", "scenarios/");
  assertMarkdownFragments("SKILL.md");
  assertMarkdownFragments("README.md");
}

const scenarioDir = path.join(root, "scenarios");
if (exists("scenarios")) {
  const scenarioFiles = fs
    .readdirSync(scenarioDir)
    .filter((file) => file.endsWith(".json"))
    .sort();

  if (scenarioFiles.length === 0) {
    fail("No scenario JSON files found in scenarios/");
  }

  const requiredScenarioFields = [
    "id",
    "title",
    "sourceExample",
    "intent",
    "setupSignals",
    "prompt",
    "expectedActions",
    "forbiddenActions",
    "completionSignals"
  ];

  for (const file of scenarioFiles) {
    const relativePath = `scenarios/${file}`;
    let scenario;
    try {
      scenario = JSON.parse(readText(relativePath));
    } catch (error) {
      fail(`${relativePath} is not valid JSON: ${error.message}`);
      continue;
    }

    for (const field of requiredScenarioFields) {
      if (!(field in scenario)) {
        fail(`${relativePath} is missing field: ${field}`);
      }
    }

    for (const field of [
      "setupSignals",
      "expectedActions",
      "forbiddenActions",
      "completionSignals"
    ]) {
      if (!Array.isArray(scenario[field]) || scenario[field].length === 0) {
        fail(`${relativePath} field must be a non-empty array: ${field}`);
      }
    }

    if (typeof scenario.sourceExample === "string") {
      assertExists(scenario.sourceExample);

      const sourceSlug = slugFromPath(scenario.sourceExample);
      if (typeof scenario.id === "string" && scenario.id !== sourceSlug) {
        fail(
          `${relativePath} id does not match sourceExample basename: ${scenario.id} != ${sourceSlug}`
        );
      }
    } else {
      fail(`${relativePath} sourceExample must be a string`);
    }
  }
}

if (errors.length > 0) {
  console.error("Skill maintenance check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Skill maintenance check passed.");
