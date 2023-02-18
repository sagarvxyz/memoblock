import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Memo, Metadata, Block, Idea } from '@prisma/client';

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
    const metadata: Metadata = {
      title: 'Untitled',
      author: 'Demo',
      tags: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    const data = (await prisma.memo.create({
      data: {
        metadata,
        idea: {
          create: {
            type: 'memo',
          },
        },
        content: 'Enter text here',
        blocks: {
          create: {
            idea: {
              create: {
                type: 'block',
              },
            },
            content: 'Enter text here',
            metadata: {
              title: 'Untitled',
              author: 'Demo',
              tags: [],
              createdAt: new Date(),
              modifiedAt: new Date(),
            },
          },
        },
      },
      include: {
        idea: true,
        blocks: true,
      },
    })) satisfies MemoWithIdeaAndBlocks;
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

export interface MemoWithIdeaAndBlocks extends Memo {
  idea: Idea;
  blocks: Block[];
}
