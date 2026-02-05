
import path from 'path';
import { loadPanelsFromManifest } from './panel-loader';
import type { Panel } from './panel-types';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/solid-80-mm-skirting-board');

export async function getSkirtingSolid80mm(): Promise<Panel[]> {
  return loadPanelsFromManifest({
    panelsDir: PANELS_DIR,
    publicBasePath: '/images/skirting-boards/solid-80-mm-skirting-board',
    productHintPrefix: 'product view for solid 80mm skirting',
    applicationHintPrefix: 'application view for solid 80mm skirting',
    itemLabel: 'solid 80mm skirting',
    collectionLabel: 'skirting-boards/solid-80-mm-skirting-board',
  });
}
