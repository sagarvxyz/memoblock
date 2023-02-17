import { db } from 'prisma/db';
import { NextApiRequest, NextApiResponse } from 'next';

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
    const ideasDb = db.Idea;
    const memosDb = db.Memo;
    const data = Object.values(ideasDb).filter((idea) => idea.type === 'memo');
    const latest = [];
    for (const memo of data) {
      const latestVersion = memo.versions[
        memo.versions.length - 1
      ] as keyof typeof memosDb;
      latest.push(memosDb[latestVersion]);
    }

    return res.json(latest);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
