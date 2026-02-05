
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-parquet-natural-collection');

export async function getFloorNatural(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/spc-parquet-natural-collection',
    productHintPrefix: 'product view for natural parquet',
    applicationHintPrefix: 'application view for natural parquet',
    itemLabel: 'natural parquet',
    collectionLabel: 'spc-parquet-natural-collection',
  });
}
