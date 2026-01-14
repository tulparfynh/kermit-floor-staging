
import fs from 'fs/promises';
import path from 'path';

export type Panel = {
  id: string;
  nameKey: string;
  thumbnailUrl: string;
  productImageUrl: string;
  productImageHint: string;
  applicationImageUrl: string;
  applicationImageHint:string;
};

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-wall-panels');

async function getPanelFromDirectory(dirName: string): Promise<Panel | null> {
    const panelDirPath = path.join(PANELS_DIR, dirName);
    const productImagePath = path.join(panelDirPath, 'product.jpg');
    const applicationImagePath = path.join(panelDirPath, 'application.jpg');

    try {
        // Check if essential image files exist before creating the panel object.
        await fs.access(productImagePath);
        await fs.access(applicationImagePath);

        const baseImagePath = `/images/spc-wall-panels/${dirName}`;
        
        return {
            id: dirName,
            nameKey: dirName, // Use the folder name as the language-agnostic key.
            thumbnailUrl: `${baseImagePath}/product.jpg`,
            productImageUrl: `${baseImagePath}/product.jpg`,
            applicationImageUrl: `${baseImagePath}/application.jpg`,
            productImageHint: `product view for ${dirName}`,
            applicationImageHint: `application view for ${dirName}`,
        };
    } catch (error) {
        console.warn(`Could not process panel in '${dirName}'. Ensure 'product.jpg' and 'application.jpg' exist.`, error);
        return null;
    }
}

export async function getPanels(): Promise<Panel[]> {
  const manifestPath = path.join(PANELS_DIR, 'products.json');

  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const productKeys: string[] = JSON.parse(manifestContent);
    
    if (!Array.isArray(productKeys)) {
        throw new Error('products.json is not a valid JSON array.');
    }

    const panelPromises = productKeys.map(key => getPanelFromDirectory(key));
    
    const panels = (await Promise.all(panelPromises)).filter((p): p is Panel => p !== null);
    
    return panels;
  } catch (error) {
    if (error instanceof SyntaxError) {
        console.error("Error: Malformed JSON in 'products.json'.", error);
    } else if (error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error("Error: 'public/images/spc-wall-panels/products.json' manifest file not found.", error);
    } else {
        console.error("Could not read or process panel data from 'products.json'.", error);
    }
    return [];
  }
}
