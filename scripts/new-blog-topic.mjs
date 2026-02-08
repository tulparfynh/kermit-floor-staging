import path from 'node:path';
import {mkdir, writeFile, access} from 'node:fs/promises';

const args = process.argv.slice(2);
const topicFlagIndex = args.findIndex((arg) => arg === '--topic' || arg === '-t');
const topicId = topicFlagIndex >= 0 ? args[topicFlagIndex + 1] : '';

function exitWithUsage(message) {
  console.error(message);
  console.error('Usage: npm run blog:new -- --topic <topic-id>');
  process.exit(1);
}

if (!topicId) {
  exitWithUsage('Missing topic id.');
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topicId)) {
  exitWithUsage('Topic id must be lowercase kebab-case (a-z, 0-9, hyphen).');
}

const today = new Date().toISOString().slice(0, 10);
const topicDir = path.join(process.cwd(), 'content', 'blog', 'topics', topicId);

const englishTemplate = `---
topicId: ${topicId}
locale: en
slug: ${topicId}
title: ""
description: ""
excerpt: ""
primaryKeyword: ""
secondaryKeywords:
  - ""
tags:
  - ""
publishedAt: "${today}"
updatedAt: "${today}"
status: draft
searchIntent: informational
targetAudience: mixed-b2b
funnelStage: awareness
sourceUrls:
  - src/components/showcase/ProductDetails.tsx
  - https://example.com
coverImage: /images/hero-images/about-us-hero-image.jpg
coverImageAlt: ""
authorName: Kermit Floor Team
ctaPath: /resources
---

## Introduction

Write the English version of the post here.
`;

const turkishTemplate = `---
topicId: ${topicId}
locale: tr
slug: ${topicId}-tr
title: ""
description: ""
excerpt: ""
primaryKeyword: ""
secondaryKeywords:
  - ""
tags:
  - ""
publishedAt: "${today}"
updatedAt: "${today}"
status: draft
searchIntent: informational
targetAudience: mixed-b2b
funnelStage: awareness
sourceUrls:
  - src/components/showcase/ProductDetails.tsx
  - https://example.com
coverImage: /images/hero-images/about-us-hero-image.jpg
coverImageAlt: ""
authorName: Kermit Floor Team
ctaPath: /resources
---

## Giris

Yazinin Turkce surumunu buraya yazin.
`;

try {
  await access(topicDir);
  exitWithUsage(`Topic directory already exists: ${topicDir}`);
} catch (error) {
  const nodeError = error;
  if (nodeError?.code !== 'ENOENT') {
    throw error;
  }
}

await mkdir(topicDir, {recursive: true});
await Promise.all([
  writeFile(path.join(topicDir, 'en.mdx'), englishTemplate, 'utf8'),
  writeFile(path.join(topicDir, 'tr.mdx'), turkishTemplate, 'utf8'),
]);

console.log(`Created bilingual blog topic scaffold at content/blog/topics/${topicId}`);
