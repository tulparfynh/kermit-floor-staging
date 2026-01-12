
import fs from 'fs/promises';
import path from 'path';

export type Panel = {
  id: string;
  name: string;
  thumbnailUrl: string;
  thumbnailHint: string;
  productImageUrl: string;
  productImageHint: string;
  applicationImageUrl: string;
  applicationImageHint: string;
};

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-wall-panels');

function formatPanelName(dirName: string): string {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function getPanelFromDirectory(dirName: string): Promise<Panel> {
  const name = formatPanelName(dirName);
  
  const thumbnailUrl = `/images/spc-wall-panels/${dirName}/thumbnail.png`;
  const productImageUrl = `/images/spc-wall-panels/${dirName}/product.png`;
  const applicationImageUrl = `/images/spc-wall-panels/${dirName}/application.png`;
  
  return {
    id: dirName,
    name: name,
    thumbnailUrl,
    productImageUrl,
    applicationImageUrl,
    thumbnailHint: `${name} thumbnail`,
    productImageHint: `${name} product view`,
    applicationImageHint: `${name} in a room`,
  };
}

export async function getPanels(): Promise<Panel[]> {
  try {
    // Ensure the directory exists before trying to read it
    await fs.access(PANELS_DIR);

    const panelDirs = await fs.readdir(PANELS_DIR);
    const panelPromises = panelDirs.map(dirName => {
        // Basic check to ensure it's a directory we're interested in, not system files like .DS_Store
        if (!dirName.startsWith('.')) {
            return getPanelFromDirectory(dirName);
        }
        return null;
    }).filter(p => p !== null) as Promise<Panel>[];
    
    const panels = await Promise.all(panelPromises);
    return panels;
  } catch (error) {
    console.error("Failed to read panel data from 'public/images/spc-wall-panels':", error);
    // If the directory doesn't exist or is empty, return an empty array
    // so the page can still build.
    return [];
  }
}
