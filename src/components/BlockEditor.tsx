import { EditorBlock } from '@/utils/EditorBlock';
import { BlockModel, NewEditorBlock } from '@/utils/types';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';

export default function BlockEditor({
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
      console.log('before:', blocks);
      const newBlock = new EditorBlock(blockIndex);
      blocksClone.splice(blockIndex + 1, 0, newBlock);
      setBlocks(blocksClone);
      console.log('after:', blocks);
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
