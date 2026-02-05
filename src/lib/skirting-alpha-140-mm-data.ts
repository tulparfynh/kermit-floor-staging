
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/alpha-140-mm-skirting-board');

export async function getSkirtingAlpha140mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/alpha-140-mm-skirting-board',
    productHintPrefix: 'product view for alpha 140mm skirting',
    applicationHintPrefix: 'application view for alpha 140mm skirting',
    itemLabel: 'alpha 140mm skirting',
    collectionLabel: 'skirting-boards/alpha-140-mm-skirting-board',
  });
}
