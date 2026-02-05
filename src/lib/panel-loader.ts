import fs from 'fs/promises';
import path from 'path';
import type { Panel } from './panel-types';

type PanelLoaderOptions = {
  panelsDir: string;
  publicBasePath: string;
  productHintPrefix: string;
  applicationHintPrefix: string;
  itemLabel: string;
  collectionLabel: string;
};

async function getPanelFromDirectory(
  dirName: string,
  options: PanelLoaderOptions
): Promise<Panel | null> {
  const panelDirPath = path.join(options.panelsDir, dirName);
  const productImagePath = path.join(panelDirPath, 'product.jpg');
  const applicationImagePath = path.join(panelDirPath, 'application.jpg');

  try {
    await fs.access(productImagePath);
    await fs.access(applicationImagePath);

    const baseImagePath = `${options.publicBasePath}/${dirName}`;

    return {
      id: dirName,
      nameKey: dirName,
      thumbnailUrl: `${baseImagePath}/product.jpg`,
      productImageUrl: `${baseImagePath}/product.jpg`,
      applicationImageUrl: `${baseImagePath}/application.jpg`,
      productImageHint: `${options.productHintPrefix} ${dirName}`,
      applicationImageHint: `${options.applicationHintPrefix} ${dirName}`,
    };
  } catch (error) {
    console.warn(
      `Could not process ${options.itemLabel} in '${dirName}'. Ensure 'product.jpg' and 'application.jpg' exist.`,
      error
    );
    return null;
  }
}

export async function loadPanelsFromManifest(
  options: PanelLoaderOptions
): Promise<Panel[]> {
  const manifestPath = path.join(options.panelsDir, 'products.json');

  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const productKeys: string[] = JSON.parse(manifestContent);

    if (!Array.isArray(productKeys)) {
      throw new Error(
        `products.json in ${options.collectionLabel} is not a valid JSON array.`
      );
    }
    const panelPromises = productKeys.map((key) =>
      getPanelFromDirectory(key, options)
    );

    return (await Promise.all(panelPromises)).filter(
      (panel): panel is Panel => panel !== null
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(
        `Error: Malformed JSON in '${options.collectionLabel}/products.json'.`,
        error
      );
    } else if (
      error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      console.error(
        `Error: 'public/images/${options.collectionLabel}/products.json' manifest file not found.`,
        error
      );
    } else {
      console.error(
        `Could not read or process ${options.itemLabel} data from 'products.json'.`,
        error
      );
    }
    return [];
  }
}
