import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (req.body.ideaId) {
      return POST(req, res);
    }
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = (await prisma.idea.create({
      data: {},
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

async function postInIdea(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { ideaId } = req.body;
    const metadata: Metadata = {
      title: 'Untitled',
      author: 'Demo',
      tags: [],
      status: 'draft',
      source: null,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    const fetchIdeaResponse = await fetch(`/api/ideas/${ideaId}`);
    const idea = await fetchIdeaResponse.json();
    const data = (await prisma.memo.create({
      data: {
        metadata,
        idea,
        blocks: {
          create: {
            idea: {
              create: {
                type: 'block',
              },
            },
            content: 'Enter text here',
            metadata,
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
