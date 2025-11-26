import { intro, outro } from "@clack/prompts";
import chalk from "chalk";
import { runSessionInit } from "./session";

// Simplified entry: start is now the session wizard.
export async function runStart(): Promise<void> {
  intro(chalk.bgBlue(" 🚀 AiBootstrap session setup "));
  await runSessionInit({});
  outro(chalk.green("Session prête. Envoie le prompt à l'agent et poursuis."));
}
