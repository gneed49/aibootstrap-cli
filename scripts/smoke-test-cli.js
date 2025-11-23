#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");

function run(cmd, options = {}) {
  const cwd = options.cwd || root;
  console.log(`\n$ (cwd=${cwd}) ${cmd}`);
  try {
    execSync(cmd, {
      stdio: "inherit",
      cwd,
      env: process.env,
    });
  } catch (err) {
    console.error(`\n❌ Command failed: ${cmd}`);
    process.exit(1);
  }
}

function main() {
  const distCli = "node dist/cli.js";

  // Rebuild before running smoke tests
  run("npm run build");

  // Clean and prepare temp projects
  run("rm -rf tmp-test-project no-agent-project");
  run("mkdir tmp-test-project no-agent-project");

  // Global help and docs commands (run from repo root)
  run(`${distCli} --help`);
  run(`${distCli} help`);
  run(`${distCli} guide`);

  // Happy path: init into tmp-test-project
  run(`${distCli} init tmp-test-project`);

  const tmpProject = path.join(root, "tmp-test-project");

  // config:agent happy paths in project with agent/
  run("node ../dist/cli.js config:agent", { cwd: tmpProject });
  run("node ../dist/cli.js config:agent --mode tool-calling --type researcher", {
    cwd: tmpProject,
  });

  // config:workflow happy paths in project with agent/
  run("node ../dist/cli.js config:workflow", { cwd: tmpProject });
  run(
    "node ../dist/cli.js config:workflow --kind pipeline --entry-file src/agent/workflows/main.ts",
    { cwd: tmpProject },
  );

  // Basic error-path checks in a project without agent/
  const noAgentProject = path.join(root, "no-agent-project");

  // These are expected to fail; capture status manually
  function runExpectFailure(cmd) {
    const cwd = noAgentProject;
    console.log(`\n$ (cwd=${cwd}) ${cmd} (expect failure)`);
    try {
      execSync(cmd, { stdio: "inherit", cwd, env: process.env });
      console.error("\n❌ Command succeeded but failure was expected");
      process.exit(1);
    } catch (err) {
      // Expected failure; just log and continue
      console.log("\n✅ Command failed as expected");
    }
  }

  runExpectFailure("node ../dist/cli.js config:agent");
  runExpectFailure("node ../dist/cli.js config:workflow");

  console.log("\n✅ CLI smoke test suite completed successfully.");
}

main();
