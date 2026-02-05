
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/optima-90-mm-skirting-board');

export async function getSkirtingOptima90mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/optima-90-mm-skirting-board',
    productHintPrefix: 'product view for optima 90mm skirting',
    applicationHintPrefix: 'application view for optima 90mm skirting',
    itemLabel: 'optima 90mm skirting',
    collectionLabel: 'skirting-boards/optima-90-mm-skirting-board',
  });
}
