import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'prisma/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    GET(req, res);
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    let memoId = id as keyof typeof memosDb;
    const memosDb = db.Memo;
    const data = memosDb[memoId];
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
    const data = 'POST worked';
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
