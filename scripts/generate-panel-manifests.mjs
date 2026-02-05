/**
 * Build-time script: reads products.json from each collection and writes
 * public/data/<collectionKey>.json so the Worker can serve panel lists without fs.
 * Run before `next build` so OpenNext includes these in assets.
 */
import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const COLLECTIONS = [
  { key: "spc-wall-panels", dir: "public/images/spc-wall-panels", baseUrl: "/images/spc-wall-panels" },
  { key: "spc-3d-wall-panels-model-a", dir: "public/images/spc-3d-panels-model-a", baseUrl: "/images/spc-3d-panels-model-a" },
  { key: "spc-3d-wall-panels-model-b", dir: "public/images/spc-3d-panels-model-b", baseUrl: "/images/spc-3d-panels-model-b" },
  { key: "spc-parquet-natural-collection", dir: "public/images/spc-parquet-natural-collection", baseUrl: "/images/spc-parquet-natural-collection" },
  { key: "spc-parquet-stone-collection", dir: "public/images/spc-parquet-stone-collection", baseUrl: "/images/spc-parquet-stone-collection" },
  { key: "full-natural-collection", dir: "public/images/full-natural-collection", baseUrl: "/images/full-natural-collection" },
  { key: "skirting-alpha-140-mm", dir: "public/images/skirting-boards/alpha-140-mm-skirting-board", baseUrl: "/images/skirting-boards/alpha-140-mm-skirting-board" },
  { key: "skirting-berlin-100-mm", dir: "public/images/skirting-boards/berlin-100-mm-skirting-board", baseUrl: "/images/skirting-boards/berlin-100-mm-skirting-board" },
  { key: "skirting-elite-100-mm", dir: "public/images/skirting-boards/elite-100-mm-skirting-board", baseUrl: "/images/skirting-boards/elite-100-mm-skirting-board" },
  { key: "skirting-moderna-100-mm", dir: "public/images/skirting-boards/moderna-100-mm-skirting-board", baseUrl: "/images/skirting-boards/moderna-100-mm-skirting-board" },
  { key: "skirting-optima-60-mm", dir: "public/images/skirting-boards/optima-60-mm-skirting-board", baseUrl: "/images/skirting-boards/optima-60-mm-skirting-board" },
  { key: "skirting-optima-90-mm", dir: "public/images/skirting-boards/optima-90-mm-skirting-board", baseUrl: "/images/skirting-boards/optima-90-mm-skirting-board" },
  { key: "skirting-solid-80-mm", dir: "public/images/skirting-boards/solid-80-mm-skirting-board", baseUrl: "/images/skirting-boards/solid-80-mm-skirting-board" },
  { key: "skirting-x-line-100-mm", dir: "public/images/skirting-boards/x-line-100-mm-skirting-board", baseUrl: "/images/skirting-boards/x-line-100-mm-skirting-board" },
];

async function buildPanelList(collection) {
  const manifestPath = path.join(ROOT, collection.dir, "products.json");
  if (!existsSync(manifestPath)) return [];
  const raw = await readFile(manifestPath, "utf-8");
  const productKeys = JSON.parse(raw);
  if (!Array.isArray(productKeys)) return [];
  const baseUrl = collection.baseUrl;
  const panels = [];
  for (const id of productKeys) {
    const productPath = path.join(ROOT, collection.dir, id, "product.jpg");
    const applicationPath = path.join(ROOT, collection.dir, id, "application.jpg");
    try {
      await access(productPath);
      await access(applicationPath);
    } catch {
      continue;
    }
    panels.push({
      id,
      nameKey: id,
      thumbnailUrl: `${baseUrl}/${id}/product.jpg`,
      productImageUrl: `${baseUrl}/${id}/product.jpg`,
      productImageHint: `product view for ${id}`,
      applicationImageUrl: `${baseUrl}/${id}/application.jpg`,
      applicationImageHint: `application view for ${id}`,
    });
  }
  return panels;
}

async function main() {
  const dataDir = path.join(ROOT, "public", "data");
  await mkdir(dataDir, { recursive: true });
  for (const col of COLLECTIONS) {
    const panels = await buildPanelList(col);
    const outPath = path.join(dataDir, `${col.key}.json`);
    await writeFile(outPath, JSON.stringify(panels), "utf-8");
    console.log(`Wrote ${panels.length} panels to public/data/${col.key}.json`);
  }
  console.log("Panel manifests generated.");
}

main().catch((err) => {
  console.error("generate-panel-manifests failed:", err);
  process.exit(1);
});
