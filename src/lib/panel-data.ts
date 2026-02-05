
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-wall-panels');

export async function getPanels(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/spc-wall-panels',
    productHintPrefix: 'product view for',
    applicationHintPrefix: 'application view for',
    itemLabel: 'panel',
    collectionLabel: 'spc-wall-panels',
  });
}
