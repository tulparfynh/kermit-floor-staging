
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/full-natural-collection');

export async function getFloorFullNatural(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/full-natural-collection',
    productHintPrefix: 'product view for full natural floor',
    applicationHintPrefix: 'application view for full natural floor',
    itemLabel: 'full natural floor',
    collectionLabel: 'full-natural-collection',
  });
}
