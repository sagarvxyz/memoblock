import { BlockModel } from '@/common/types';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { Block } from './blockClass';
import styles from './Editor.module.css';

export function TextBlock({
  blockIndex,
  blocks,
  setBlocks,
}: {
  blockIndex: number;
  blocks: Block[];
  setBlocks: Dispatch<SetStateAction<Block[]>>;
}) {
  const blocksClone: typeof blocks = JSON.parse(JSON.stringify(blocks));
  const [content, setContent] = useState(blocksClone[blockIndex].content);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    blocksClone[blockIndex].content = e.target.value;
    setBlocks(blocksClone);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      const block = new Block(blockIndex);
      blocksClone.splice(blockIndex + 1, 0, block);
      setBlocks(blocksClone);
    }
  };
  return (
    <textarea
      className={styles.textblock}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      defaultValue={content}
      autoFocus
    />
  );
}
