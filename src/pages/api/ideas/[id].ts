import { prisma } from '@/utils/prisma';
import { IdeaWithBlocksAndMemos } from '@/utils/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// input validation
const allowedMethods = ['GET', 'POST'];
const idSchema = z.string().length(24);
const ideaSchema = z.object({
  id: z.string(),
  type: z.string(),
  blockIds: z.array(z.string().optional()),
  memoIds: z.array(z.string().optional()),
});

// route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowedMethods.includes(req.method!)) {
      return res.status(405).send({ message: 'method not allowed' });
    }
    if (req.method === 'GET') {
      const data = await GET(req, res);
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const data = await POST(req, res);
      res.status(200).json(data);
    }
  } catch (error) {
    let message = 'unknown server error';
    if (error instanceof Error) {
      message = error.message;
    }
    console.error(message);
    res.status(500).send({ message });
  }
}
// GET Idea with Blocks and Memos
async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const validation = idSchema.safeParse(id);
  if (typeof id !== 'string' || !validation.success) {
    const message = 'Must be a 24 character hexadecimal ObjectId';
    return res.status(400).send({ message });
  }
  const data = (await prisma.idea.findUnique({
    where: { id },
    include: { blocks: true, memos: true },
  })) satisfies IdeaWithBlocksAndMemos | null;
  return res.json(data);
}

// POST an new or updated Idea
const POST = async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const body = req.body;
  const validation = {
    id: idSchema.safeParse(id),
    body: ideaSchema.safeParse(body),
  };
  if (typeof id !== 'string' || !validation.id.success) {
    const message = 'Must be a 24 character hexadecimal ObjectId';
    return res.status(400).send({ message });
  }
  if (typeof body !== 'object' || !validation.body.success) {
    const message = 'Invalid body shape';
    return res.status(400).send({ message });
  }
  const data = (await prisma.idea.update({
    where: { id },
    data: { ...body },
    include: { blocks: true, memos: true },
  })) satisfies IdeaWithBlocksAndMemos;
  return res.json(data);
};
