import { Block, Idea, Memo, Metadata, Statuses, Source } from '@prisma/client';

// Prisma schema types
export interface BlockModel extends Block {}
export interface IdeaModel extends Idea {}
export interface MemoModel extends Memo {}
export interface MetadataModel extends Metadata {}
export type MetadataStatus = Statuses;
export type MetadataSource = Source;
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
