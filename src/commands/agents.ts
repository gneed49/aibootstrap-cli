import chalk from "chalk";

export function printAgentRoster(): void {
  console.log(chalk.blue("\nAvailable agent roles (see agent/agents/*.md)"));
  console.log(
    "  - product_agent.md   : scope/spec/refinement\n  - code_agent.md       : implementation\n  - testing_agent.md    : QA and validation\n  - architect_agent.md  : architecture/design/migrations\n  - ux_agent.md         : UX flows and acceptance\n  - review_agent.md     : critical review/QA gate",
  );
  console.log(
    chalk.gray(
      "\nUse these personas sequentially per phase (plan -> design -> build -> test -> review) to get focused outputs.",
    ),
  );
}
