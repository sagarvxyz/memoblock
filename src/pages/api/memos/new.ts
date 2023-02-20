import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Metadata } from '@prisma/client';
import { IdeaWithBlocksAndMemos, MemoWithIdeaAndBlocks } from '@/types';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return POST(req, res);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = (await prisma.idea.create({
      data: defaultData,
      include: {
        memos: true,
        blocks: true,
      },
    })) satisfies IdeaWithBlocksAndMemos;
    const newMemo = data.memos[0];
    return res.json(newMemo);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

const defaultMetadata: Metadata = {
  title: 'Untitled',
  author: 'Unknown',
  status: 'draft',
  source: null,
  tags: [],
  createdAt: new Date(),
  modifiedAt: new Date(),
};

const defaultData = {
  type: 'memo',
  memos: {
    create: {
      metadata: defaultMetadata,
      blocks: {
        create: {
          content: 'Enter text here',
          metadata: defaultMetadata,
          idea: {
            create: {
              type: 'block',
            },
          },
        },
      },
    },
  },
};
