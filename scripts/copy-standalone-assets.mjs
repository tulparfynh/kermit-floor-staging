import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

async function copyDir(src, dest) {
  if (!existsSync(src)) return;
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, force: true });
}

async function main() {
  await copyDir("public", path.join(".next", "standalone", "public"));
  await copyDir(path.join(".next", "static"), path.join(".next", "standalone", ".next", "static"));
  console.log("Copied public/ and .next/static into .next/standalone/");
}

main().catch((err) => {
  console.error("copy-standalone-assets failed:", err);
  process.exit(1);
});
