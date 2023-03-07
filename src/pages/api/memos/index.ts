import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/common/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return GET(req, res);
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.memo.findMany({
      select: {
        id: true,
        metadata: true,
      },
    });
    data.sort(
      (a, b) =>
        a.metadata.modifiedAt.getTime() - b.metadata.modifiedAt.getTime()
    );
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
