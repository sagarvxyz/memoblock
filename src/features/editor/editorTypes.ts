import { BlockModel } from '@/common/types';

/** Type for newly created blocks in Editor without DB records (ie no ID) */
export interface NewEditorBlock
  extends Pick<BlockModel, 'content' | 'metadata'> {
  id: string;
}
