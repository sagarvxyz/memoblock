import { BlockModel } from '@/common/types';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { Block } from './BlockClass';
import { NewEditorBlock } from './editorTypes';

export function EditorBlock({
  blockIndex,
  blocks,
  setBlocks,
}: {
  blockIndex: number;
  blocks: (BlockModel | NewEditorBlock)[];
  setBlocks: Dispatch<SetStateAction<(BlockModel | NewEditorBlock)[]>>;
}) {
  const blocksClone = JSON.parse(JSON.stringify(blocks)) as typeof blocks;
  const [content, setContent] = useState(blocksClone[blockIndex].content);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    blocksClone[blockIndex].content = e.target.value;
    setBlocks(blocksClone);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      const block = new Block(blockIndex);
      blocksClone.splice(blockIndex + 1, 0, block);
      setBlocks(blocksClone);
    }
  };
  return (
    <textarea
      className="Editor"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      defaultValue={content}
      autoFocus
    />
  );
}