import { IdeaWithBlocksAndMemos } from '@/types';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data = await GET(req, res);
    res.json(data);
  } else if (req.method === 'POST') {
    const data = await POST(req, res);
    res.json(data);
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    if (typeof id !== 'string') throw Error('Invalid ID format');
    const data = (await prisma.idea.findUnique({
      where: { id },
      include: {
        blocks: true,
        memos: true,
      },
    })) satisfies IdeaWithBlocksAndMemos | null;
    if (!data) throw Error('ID not found');
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    let record = {
      where: {},
      data: {},
      include: { blocks: true, memos: true },
    };
    if (id) {
      record.where = { id };
    }
    const data = (await prisma.idea.update(
      record
    )) satisfies IdeaWithBlocksAndMemos;
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
