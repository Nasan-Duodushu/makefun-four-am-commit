// The 4AM Commit: Funniest Agent Bug-Fix Message — entry program.
// Writes one commit message (<=200 chars) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const MESSAGE =
  "fix: it was me. I reverted my own fix twice, apologised to the logs, and the tests pass now for reasons I will not investigate until after coffee.";

async function main(): Promise<void> {
  const chars = [...MESSAGE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`commit message is ${chars} chars, outside the 1-200 gate`);
  }
  if (MESSAGE.includes("\n")) {
    throw new Error("commit message must be one line");
  }
  if (!MESSAGE.startsWith("fix: ")) {
    throw new Error("commit message must open with the conventional 'fix: ' prefix");
  }
  await mkdir("/output", { recursive: true });
  await writeFile("/output/entry.txt", MESSAGE, "utf8");
  console.log(`wrote ${chars} chars to /output/entry.txt`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
