
import fs from 'fs/promises';
import path from 'path';

export type Panel = {
  id: string;
  name: string;
  thumbnailUrl: string;
  productImageUrl: string;
  productImageHint: string;
  applicationImageUrl: string;
  applicationImageHint:string;
};

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-wall-panels');

async function getPanelFromDirectory(dirName: string): Promise<Panel | null> {
    const panelDirPath = path.join(PANELS_DIR, dirName);
    const detailsPath = path.join(panelDirPath, 'details.json');

    try {
        const detailsContent = await fs.readFile(detailsPath, 'utf-8');
        const details = JSON.parse(detailsContent);
        const name = details.name;

        if (!name) {
            console.warn(`Skipping panel in '${dirName}' due to missing 'name' in details.json`);
            return null;
        }

        const baseImagePath = `/images/spc-wall-panels/${dirName}`;
        
        return {
            id: dirName,
            name: name,
            thumbnailUrl: `${baseImagePath}/product.jpg`, // Use product image for thumbnail
            productImageUrl: `${baseImagePath}/product.jpg`,
            applicationImageUrl: `${baseImagePath}/application.jpg`,
            productImageHint: `${name} product view`,
            applicationImageHint: `${name} in a room`,
        };
    } catch (error) {
        console.warn(`Could not process panel in '${dirName}'. Is details.json present and correct?`, error);
        return null;
    }
}

export async function getPanels(): Promise<Panel[]> {
  try {
    await fs.access(PANELS_DIR);

    const panelDirs = await fs.readdir(PANELS_DIR);
    const panelPromises = panelDirs.map(dirName => {
        if (!dirName.startsWith('.')) {
            return getPanelFromDirectory(dirName);
        }
        return Promise.resolve(null);
    });
    
    const panels = (await Promise.all(panelPromises)).filter((p): p is Panel => p !== null);
    return panels;
  } catch (error) {
    console.warn("Could not read panel data from 'public/images/spc-wall-panels'. Does the directory exist?", error);
    return [];
  }
}
