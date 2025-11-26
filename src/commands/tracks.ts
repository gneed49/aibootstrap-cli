import chalk from "chalk";

export function printTrackGuide(): void {
  console.log(chalk.blue("\nTracks (Quick / Standard / Enterprise)"));
  console.log(
    chalk.gray(
      "Right-size effort based on scope/risk. Record the chosen track in your task or change.",
    ),
  );

  console.log(chalk.green("\nQuick"));
  console.log(
    "  - Bugfix or small feature, local change, no breaking, low perf/security risk.\n  - Artifacts: concise spec, tasks, targeted tests.",
  );

  console.log(chalk.green("\nStandard"));
  console.log(
    "  - Multi-file feature or new user flow, moderate impact, possible external deps.\n  - Artifacts: full spec, task breakdown, light design if new patterns, acceptance criteria + test plan.",
  );

  console.log(chalk.green("\nEnterprise"));
  console.log(
    "  - Breaking change, data migration, critical perf/security, multiple teams/services.\n  - Artifacts: PRD + detailed architecture, migration/rollback plan, risks, reinforced test plan (perf/security), review checklists.",
  );

  console.log(chalk.gray("\nTip: See agent/agent_flow/workflow_tracks.md for the full text."));
}
