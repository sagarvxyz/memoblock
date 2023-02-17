import { Block, Memo, Idea } from '@prisma/client';
import { BSON, ObjectId } from 'bson';

export const blocks: Block[] = [
  {
    id: '63eecca9a7858a74264f3b2a',
    memoIds: ['63eecca9a7858a74264f3b36', '63eecca9a7858a74264f3b38'],
    ideaId: '63eecca9a7858a74264f3b3b',
    metadata: {
      title: 'b1',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-01-01T09:05:01Z'),
      modifiedAt: new Date('2023-01-01T09:05:01Z'),
    },
    content: `MemoBlock is a markdown editor is built around three concepts: Memos, Blocks, and Ideas.`,
  },
  {
    id: '63eecca9a7858a74264f3b2c',
    memoIds: ['63eecca9a7858a74264f3b36', '63eecca9a7858a74264f3b38'],
    ideaId: '63eecca9a7858a74264f3b3b',
    metadata: {
      title: 'b2',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-01-01T09:05:01Z'),
      modifiedAt: new Date('2023-01-01T09:05:01Z'),
    },
    content: `A Memo is made up of Blocks. A Block contains:
      - Data: ie. data points, metrics, tables, and queries.
      - Text: ie. sentences and paragraphs.`,
  },
  {
    id: '63eecca9a7858a74264f3b2e',
    memoIds: ['63eecca9a7858a74264f3b36', '63eecca9a7858a74264f3b38'],
    ideaId: '63eecca9a7858a74264f3b3c',
    metadata: {
      title: 'b3',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-01-01T09:05:01Z'),
      modifiedAt: new Date('2023-01-01T09:05:01Z'),
    },
    content: `Memos and Blocks are version controlled. A new version is created when any edits are made. Related versions are stored in an Idea.`,
  },
  {
    id: '63eecca9a7858a74264f3b30',
    memoIds: ['63eecca9a7858a74264f3b36'],
    ideaId: '63eecca9a7858a74264f3b3d',
    metadata: {
      title: 'b4',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-01-01T09:05:01Z'),
      modifiedAt: new Date('2023-01-01T09:05:01Z'),
    },
    content: `To prevent Memos from changing unexpectedly, References to Blocks are version locked.`,
  },
  {
    id: '63eecca9a7858a74264f3b32',
    ideaId: '63eecca9a7858a74264f3b3e',
    memoIds: ['63eecca9a7858a74264f3b36', '63eecca9a7858a74264f3b38'],
    metadata: {
      title: 'b5',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-01-01T09:05:01Z'),
      modifiedAt: new Date('2023-01-01T09:05:01Z'),
    },
    content: `Other key features include:
    1. Support for standard markdown
    2. YAML front matter for custom attributes
    3. Tags for custom organization`,
  },
  {
    id: '63eecca9a7858a74264f3b34',
    ideaId: '63eecca9a7858a74264f3b3d',
    memoIds: ['63eecca9a7858a74264f3b38'],
    metadata: {
      title: 'b6',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-02-04T15:34:15Z'),
      modifiedAt: new Date('2023-02-04T15:34:15Z'),
    },
    content: `To prevent Memos from changing unexpectedly, References to Blocks are version locked unless explicitly set to ”update to latest.”`,
  },
];

export const memos: Memo[] = [
  {
    id: '63eecca9a7858a74264f3b36',
    ideaId: '63eecca9a7858a74264f3b3a',
    blockIds: [
      '63eecca9a7858a74264f3b2a',
      '63eecca9a7858a74264f3b2c',
      '63eecca9a7858a74264f3b2e',
      '63eecca9a7858a74264f3b30',
      '63eecca9a7858a74264f3b32',
    ],
    metadata: {
      title: 'About Memoblock',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-01-01T09:05:01Z'),
      modifiedAt: new Date('2023-01-01T09:05:01Z'),
    },
  },
  {
    id: '63eecca9a7858a74264f3b38',
    ideaId: '63eecca9a7858a74264f3b3a',
    blockIds: [
      '63eecca9a7858a74264f3b2a',
      '63eecca9a7858a74264f3b2c',
      '63eecca9a7858a74264f3b2e',
      '63eecca9a7858a74264f3b34',
      '63eecca9a7858a74264f3b32',
    ],
    metadata: {
      title: 'About Memoblock',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: new Date('2023-02-04T15:34:15Z'),
      modifiedAt: new Date('2023-02-04T15:34:15Z'),
    },
  },
];
export const ideas: Idea[] = [
  {
    id: '63eecca9a7858a74264f3b3a',
    type: 'memo',
  },
  {
    id: '63eecca9a7858a74264f3b3b',
    type: 'block',
  },
  {
    id: '63eecca9a7858a74264f3b3c',
    type: 'block',
  },
  {
    id: '63eecca9a7858a74264f3b3d',
    type: 'block',
  },
  {
    id: '63eecca9a7858a74264f3b3e',
    type: 'block',
  },
  {
    id: '63eecca9a7858a74264f3b3f',
    type: 'block',
  },
];
