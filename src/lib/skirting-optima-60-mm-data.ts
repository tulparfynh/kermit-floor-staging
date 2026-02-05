
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/optima-60-mm-skirting-board');

export async function getSkirtingOptima60mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/optima-60-mm-skirting-board',
    productHintPrefix: 'product view for optima 60mm skirting',
    applicationHintPrefix: 'application view for optima 60mm skirting',
    itemLabel: 'optima 60mm skirting',
    collectionLabel: 'skirting-boards/optima-60-mm-skirting-board',
  });
}
