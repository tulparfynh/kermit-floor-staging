import data from './resources.json';

export type Locale = 'en' | 'tr';

export type FileDetails = {
  url: string;
  size: string;
  format: 'pdf' | 'zip' | 'dwg' | 'dxf';
};

export type ProductLine = 'skirting' | 'flooring' | 'wall_panels' | 'general';

export type DocType = 
  | 'pack'
  | 'catalogue'
  | 'tds'
  | 'installation'
  | 'warranty'
  | 'maintenance'
  | 'cad'
  | 'textures'
  | 'packaging'
  | 'spec_text'
  | 'troubleshooting'
  | 'marketing';

export type InstallationMethod = 'adhesive' | 'mechanical' | 'clip' | 'silicone' | 'hybrid' | 'other' | null;

export type Resource = {
  id: string;
  productLine: ProductLine;
  docType: DocType;
  audience: ('installer' | 'dealer' | 'architect' | 'all')[];
  installationMethod: InstallationMethod;
  title: string;
  title_tr: string;
  summary: string;
  summary_tr: string;
  bullets?: string[];
  bullets_tr?: string[];
  version: string;
  updatedAt: string; // YYYY-MM-DD
  tags: string[];
  files: {
    en: FileDetails;
    tr: FileDetails;
  };
  previewEnabled: boolean;
};

export async function getResources(): Promise<Resource[]> {
  // In a real app, this could fetch from a CMS or database.
  // Here, we're just returning the imported JSON data.
  return data.resources as Resource[];
}

export async function getStarterPacks(): Promise<Resource[]> {
  const allResources = await getResources();
  return allResources.filter(r => r.docType === 'pack');
}

export async function getLibraryDocuments(): Promise<Resource[]> {
  const allResources = await getResources();
  return allResources.filter(r => r.docType !== 'pack');
}
