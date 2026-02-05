
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-3d-panels-model-b');

export async function get3dPanelsModelB(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/spc-3d-panels-model-b',
    productHintPrefix: 'product view for 3d panel model b',
    applicationHintPrefix: 'application view for 3d panel model b',
    itemLabel: '3D panel model b',
    collectionLabel: 'spc-3d-panels-model-b',
  });
}
