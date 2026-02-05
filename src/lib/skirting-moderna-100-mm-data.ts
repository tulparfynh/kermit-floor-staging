
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/moderna-100-mm-skirting-board');

export async function getSkirtingModerna100mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/moderna-100-mm-skirting-board',
    productHintPrefix: 'product view for moderna 100mm skirting',
    applicationHintPrefix: 'application view for moderna 100mm skirting',
    itemLabel: 'moderna 100mm skirting',
    collectionLabel: 'skirting-boards/moderna-100-mm-skirting-board',
  });
}
