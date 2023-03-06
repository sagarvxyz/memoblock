import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/common/prisma';
import { MemoWithBlocksAndIdea } from '@/common/types';

// handle routes
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
// GET memo with provided ID
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
// POST an update to memo
async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    if (typeof id !== 'string') throw Error('Invalid ID format');
    let data = JSON.parse(req.body);
    const prevData = await prisma.memo.findUnique({
      where: { id },
      include: {
        blocks: true,
        idea: true,
      },
    });
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

/**
 * Compares user edited Memo with existing Memo in database and creates or updates records.
 * If Memo !== prevMemo then create new Memo in the same Idea object.
 * For each Block:
 *  - if status === 'draft' then update existing record
 *  - if net new, create a new Block and Idea
 *  - if updated, create a new Block in prevBlock Idea
 *  - else no change
 * Then link the list of Block refs with the new Memo.
 */
async function createRecords(
  memo: MemoWithBlocksAndIdea,
  prevMemo: MemoWithBlocksAndIdea
) {
  try {
    // compare Memos
    let recordHasChanged = JSON.stringify(memo) !== JSON.stringify(prevMemo);
    if (!recordHasChanged) return;
    // compare Blocks and update / create if records have changed
    const blockIds = [];
    for (const block of memo.blocks) {
      const prevBlock = prevMemo.blocks.filter(
        (prevBlock) => prevBlock.id === block.id
      )[0];
      let blockId = '';
      // if no prior block then create new Block and Idea
      if (!prevBlock) {
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
        // if content changed and then create new Block in same idea or update if draft
      } else if (prevBlock.content !== block.content) {
        if (prevBlock.metadata.status !== 'live') {
          const data = await prisma.block.update({
            where: { id: prevBlock.id },
            data: {
              ideaId: block.ideaId,
              memoIds: block.memoIds,
              content: block.content,
              metadata: { ...block.metadata, modifiedAt: new Date() },
            },
          });
          blockId = prevBlock.id;
        } else {
          const data = await prisma.idea.update({
            where: { id: prevBlock.ideaId },
            data: {
              blocks: {
                create: {
                  content: block.content,
                  metadata: { ...block.metadata, modifiedAt: new Date() },
                },
              },
            },
            include: {
              blocks: true,
            },
          });
          blockId = data.blocks[data.blocks.length - 1].id;
        }
      } else {
        blockId = prevBlock.id;
      }
      blockIds.push(blockId);
    }
    // connect Block refs to new Memo
    memo.blockIds = blockIds;
    const connect = blockIds.map((blockId) => {
      return { id: blockId };
    });
    // create new / update memo under the same idea
    if (prevMemo.metadata.status !== 'live') {
      const data = await prisma.memo.update({
        where: { id: prevMemo.id },
        data: {
          ideaId: prevMemo.ideaId,
          metadata: { ...memo.metadata, modifiedAt: new Date() },
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
    } else {
      const data = await prisma.memo.create({
        data: {
          metadata: { ...memo.metadata, modifiedAt: new Date() },
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
    }
  } catch (error) {
    console.log(error);
  }
}
