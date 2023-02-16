const Block = {
  b1: {
    id: 'b1',
    ideaId: 'ib1',
    memoIds: ['m1', 'm2'],
    metadata: {
      id: 'mb1',
      parentId: 'b1',
      title: 'b1',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-01-01T09:05:01Z',
      modifiedAt: '2023-01-01T09:05:01Z',
    },
    content: `MemoBlock is a markdown editor is built around three concepts: Memos, Blocks, and Ideas.`,
  },
  b2: {
    id: 'b2',
    ideaId: 'ib2',
    memoIds: ['m1', 'm2'],
    metadata: {
      id: 'mb2',
      parentId: 'b2',
      title: 'b2',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-01-01T09:05:01Z',
      modifiedAt: '2023-01-01T09:05:01Z',
    },
    content: `A Memo is made up of Blocks. A Block contains:
      - Data: ie. data points, metrics, tables, and queries.
      - Text: ie. sentences and paragraphs.`,
  },
  b3: {
    id: 'b3',
    ideaId: 'ib3',
    memoIds: ['m1', 'm2'],
    metadata: {
      id: 'mb3',
      parentId: 'b3',
      title: 'b3',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-01-01T09:05:01Z',
      modifiedAt: '2023-01-01T09:05:01Z',
    },
    content: `Memos and Blocks are version controlled. A new version is created when any edits are made. Related versions are stored in an Idea.`,
  },
  b4: {
    id: 'b4',
    ideaId: 'ib4',
    memoIds: ['m1'],
    metadata: {
      id: 'mb4',
      parentId: 'b4',
      title: 'b4',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-01-01T09:05:01Z',
      modifiedAt: '2023-01-01T09:05:01Z',
    },
    content: `To prevent Memos from changing unexpectedly, References to Blocks are version locked.`,
  },
  b5: {
    id: 'b5',
    ideaId: 'ib5',
    memoIds: ['m1', 'm2'],
    metadata: {
      id: 'mb5',
      parentId: 'b5',
      title: 'b5',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-01-01T09:05:01Z',
      modifiedAt: '2023-01-01T09:05:01Z',
    },
    content: `Other key features include:
    1. Support for standard markdown
    2. YAML front matter for custom attributes
    3. Tags for custom organization`,
  },
  b6: {
    id: 'b6',
    ideaId: 'ib4',
    memoIds: ['m2'],
    metadata: {
      id: 'mb6',
      parentId: 'b6',
      title: 'b6',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-02-04T15:34:15Z',
      modifiedAt: '2023-02-04T15:34:15Z',
    },
    content: `To prevent Memos from changing unexpectedly, References to Blocks are version locked unless explicitly set to ”update to latest.”`,
  },
};

const Idea = {
  im1: {
    id: 'im1',
    type: 'memo',
    versions: ['m1', 'm2'],
  },
  ib1: {
    id: 'ib1',
    type: 'block',
    versions: ['b1'],
  },
  ib2: {
    id: 'ib1',
    type: 'block',
    versions: ['b2'],
  },
  ib3: {
    id: 'ib1',
    type: 'block',
    versions: ['b3'],
  },
  ib4: {
    id: 'ib1',
    type: 'block',
    versions: ['b4', 'b6'],
  },
  ib5: {
    id: 'ib1',
    type: 'block',
    versions: ['b5'],
  },
};
const Memo = {
  m1: {
    id: 'm1',
    ideaId: 'im1',
    blocks: [Block.b1, Block.b2, Block.b3, Block.b4, Block.b5],
    metadata: {
      id: 'mm1',
      parentId: 'm1',
      title: 'About Memoblock',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-01-01T09:05:01Z',
      modifiedAt: '2023-01-01T09:05:01Z',
    },
  },
  m2: {
    id: 'm2',
    ideaId: 'im1',
    blocks: [Block.b1, Block.b2, Block.b3, Block.b6, Block.b5],
    metadata: {
      id: 'mm2',
      parentId: 'm2',
      title: 'About Memoblock',
      author: 'Sagar Velagala',
      tags: ['demo'],
      createdAt: '2023-02-04T15:34:15Z',
      modifiedAt: '2023-02-04T15:34:15Z',
    },
  },
};
export const db = {
  Memo,
  Block,
  Idea,
};
