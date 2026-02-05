
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/berlin-100-mm-skirting-board');

export async function getSkirtingBerlin100mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/berlin-100-mm-skirting-board',
    productHintPrefix: 'product view for berlin 100mm skirting',
    applicationHintPrefix: 'application view for berlin 100mm skirting',
    itemLabel: 'berlin 100mm skirting',
    collectionLabel: 'skirting-boards/berlin-100-mm-skirting-board',
  });
}
