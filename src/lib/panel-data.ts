
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Panel = {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailHint: string;
  productImageUrl: string;
  productImageHint: string;
  applicationImageUrl: string;
  applicationImageHint: string;
};

const getImageData = (id: string): Pick<ImagePlaceholder, 'imageUrl' | 'imageHint'> => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        throw new Error(`Placeholder image with id "${id}" not found.`);
    }
    return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

const panelDefinitions = [
    {
        id: '1',
        name: 'Natural Oak',
        description:
        'A classic wood finish that brings warmth and timeless elegance to any room.',
        thumbId: 'kermit-thumb-1',
        prodId: 'kermit-prod-1',
        appId: 'kermit-app-1',
    },
    {
        id: '2',
        name: 'Marble White',
        description:
        'Luxurious and bright, this marble-effect panel creates a sense of space and sophistication.',
        thumbId: 'kermit-thumb-2',
        prodId: 'kermit-prod-2',
        appId: 'kermit-app-2',
    },
    {
        id: '3',
        name: 'Concrete Grey',
        description:
        'An industrial, modern look with a smooth concrete finish for a minimalist aesthetic.',
        thumbId: 'kermit-thumb-3',
        prodId: 'kermit-prod-3',
        appId: 'kermit-app-3',
    },
    {
        id: '4',
        name: 'Charcoal Slate',
        description:
        'A deep, textured slate effect that adds drama and a natural stone feel to your walls.',
        thumbId: 'kermit-thumb-4',
        prodId: 'kermit-prod-4',
        appId: 'kermit-app-4',
    },
];


export const panels: Panel[] = panelDefinitions.map(def => {
    const thumb = getImageData(def.thumbId);
    const prod = getImageData(def.prodId);
    const app = getImageData(def.appId);
    
    return {
        id: def.id,
        name: def.name,
        description: def.description,
        thumbnailUrl: thumb.imageUrl,
        thumbnailHint: thumb.imageHint,
        productImageUrl: prod.imageUrl,
        productImageHint: prod.imageHint,
        applicationImageUrl: app.imageUrl,
        applicationImageHint: app.imageHint,
    }
});
