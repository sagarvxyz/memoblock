import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Memo, Block } from '@prisma/client';
import { MemoWithIdeaAndBlocks } from '@/types';

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
    if (typeof id !== 'string') throw Error('Invalid ID format');
    let data = JSON.parse(req.body);
    const prevData = (await prisma.memo.findUnique({
      where: { id },
      include: {
        blocks: true,
        idea: true,
      },
    })) satisfies MemoWithIdeaAndBlocks | null;

    if (!prevData) {
      throw Error('Record does not already exist in DB.');
    } else if (JSON.stringify(data) !== JSON.stringify(prevData)) {
      data = await createRecords(data, prevData);
    }
    return res.json(data);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new Error('Unknown server error');
    }
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

async function createRecords(
  memo: MemoWithIdeaAndBlocks,
  prevMemo: MemoWithIdeaAndBlocks
) {
  try {
    // check if record has changed
    let recordHasChanged = JSON.stringify(memo) !== JSON.stringify(prevMemo);
    if (!recordHasChanged) return;
    // compare each block object from new memo and see if it changed from prev
    const blockIds = [];
    for (const block of memo.blocks) {
      const prevBlock = prevMemo.blocks.filter(
        (prevBlock) => prevBlock.id === block.id
      )[0];
      let blockId = '';
      // if block is new then create new idea
      // else if block has been changed then create new block in idea
      // else no change
      if (!block.id) {
        const data = await prisma.idea.create({
          data: {
            type: 'block',
            blocks: {
              create: {
                metadata: block.metadata,
                content: block.content,
              },
            },
          },
          include: {
            blocks: true,
          },
        });
        blockId = data.blocks[0].id;
      } else if (prevBlock.content !== block.content) {
        const data = await prisma.idea.update({
          where: { id: prevBlock.ideaId },
          data: {
            blocks: {
              create: {
                content: block.content,
                metadata: block.metadata,
              },
            },
          },
          include: {
            blocks: true,
          },
        });
        console.log('changed', data);
        blockId = data.blocks[data.blocks.length - 1].id;
      } else {
        blockId = prevBlock.id;
      }
      blockIds.push(blockId);
    }
    // connect blocks to new memo
    memo.blockIds = blockIds;
    const connect = blockIds.map((blockId) => {
      return { id: blockId };
    });
    // create new memo under the same idea
    const data = await prisma.memo.create({
      data: {
        metadata: memo.metadata,
        idea: {
          connect: { id: memo.ideaId },
        },
        blocks: {
          connect,
        },
      },
      include: {
        idea: true,
        blocks: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

function getContent(blocks: Block[]) {
  return blocks.reduce(
    (content, block) => (content += `${block.content}  `),
    ''
  );
}
