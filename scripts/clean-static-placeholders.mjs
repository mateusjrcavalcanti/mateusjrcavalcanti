import { existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");
const placeholder = "__static-export-placeholder";

function clean(directory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.name.includes(placeholder)) {
      rmSync(path, { recursive: true, force: true });
    } else if (entry.isDirectory()) {
      clean(path);
    }
  }
}

clean(outputDirectory);
console.log("Placeholders da exportação estática removidos do artefato.");
