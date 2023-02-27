import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// handle routes
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

// GET idea with blocks and memos
async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    if (typeof id !== 'string') throw Error('Invalid ID format');
    const data = await prisma.idea.findUnique({
      where: { id },
      include: {
        blocks: true,
        memos: true,
      },
    });
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
// POST an update to an existing idea
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
    const data = await prisma.idea.update(record);
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
