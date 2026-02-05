
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/x-line-100-mm-skirting-board');

export async function getSkirtingXLine100mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/x-line-100-mm-skirting-board',
    productHintPrefix: 'product view for x-line 100mm skirting',
    applicationHintPrefix: 'application view for x-line 100mm skirting',
    itemLabel: 'x-line 100mm skirting',
    collectionLabel: 'skirting-boards/x-line-100-mm-skirting-board',
  });
}
