import { Block, Idea, Memo } from '@prisma/client';

export interface MemoWithIdeaAndBlocks extends Memo {
  idea: Idea;
  blocks: Block[];
}

export interface IdeaWithBlocksAndMemos extends Idea {
  blocks: Block[];
  memos: Memo[];
}

export interface BlockWithIdeaAndMemos extends Block {
  idea: Idea;
  memos: Memo[];
}
