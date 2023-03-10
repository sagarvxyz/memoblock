import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/common/prisma';

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
    const data = await prisma.idea.create({
      data: {
        type: 'memo',
        memos: {
          create: {
            metadata: {
              title: 'Untitled',
              author: 'Unknown',
              status: 'draft',
              source: null,
              tags: [],
              createdAt: new Date(),
              modifiedAt: new Date(),
            },
          },
        },
      },
      include: {
        memos: true,
        blocks: true,
      },
    });
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
