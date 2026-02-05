
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-3d-panels-model-a');

export async function get3dPanelsModelA(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/spc-3d-panels-model-a',
    productHintPrefix: 'product view for 3d panel',
    applicationHintPrefix: 'application view for 3d panel',
    itemLabel: '3D panel',
    collectionLabel: 'spc-3d-panels-model-a',
  });
}
