
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-parquet-stone-collection');

export async function getFloorStone(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/spc-parquet-stone-collection',
    productHintPrefix: 'product view for stone parquet',
    applicationHintPrefix: 'application view for stone parquet',
    itemLabel: 'stone parquet',
    collectionLabel: 'spc-parquet-stone-collection',
  });
}
