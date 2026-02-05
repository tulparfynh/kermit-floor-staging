
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/elite-100-mm-skirting-board');

export async function getSkirtingElite100mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/elite-100-mm-skirting-board',
    productHintPrefix: 'product view for elite 100mm skirting',
    applicationHintPrefix: 'application view for elite 100mm skirting',
    itemLabel: 'elite 100mm skirting',
    collectionLabel: 'skirting-boards/elite-100-mm-skirting-board',
  });
}
