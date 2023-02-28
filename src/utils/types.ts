import { Block, Idea, Memo } from '@prisma/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// Prisma schema types
export interface BlockModel extends Block {}
export interface IdeaModel extends Idea {}
export interface MemoModel extends Memo {}
export interface IdeaWithBlocksAndMemos extends Idea {
  blocks?: BlockModel[];
  memos?: MemoModel[];
}
export interface MemoWithBlocks extends Memo {
  blocks: BlockModel[];
}
export interface MemoWithBlocksAndIdea extends MemoWithBlocks {
  idea: IdeaModel;
}

// Frontend schema types
/** Type for newly created blocks in Editor without DB records (ie no ID) */
export interface NewEditorBlock extends Pick<BlockModel, 'content'> {
  id: string;
}
