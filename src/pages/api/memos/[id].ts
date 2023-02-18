import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Memo } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return GET(req, res);
  } else if (req.method === 'POST') {
    return POST(req, res);
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    if (typeof id !== 'string') throw Error('Invalid ID format');
    let data = await prisma.memo.findUnique({
      where: { id },
      include: {
        blocks: true,
        idea: true,
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

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    let body = JSON.parse(req.body);
    if (typeof id !== 'string') throw Error('Invalid ID format');
    let data = await prisma.memo.update({
      where: { id },
      data: {
        content: body,
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
