import { Block } from '@prisma/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export default function BlockEditor({
  blockIndex,
  blocks,
  setBlocks,
}: {
  blockIndex: keyof typeof blocks;
  blocks: Block[];
  setBlocks: Dispatch<SetStateAction<Block[]>>;
}) {
  const newBlocks = JSON.parse(JSON.stringify(blocks));
  const newBlock = newBlocks[blockIndex];
  const [content, setContent] = useState(newBlock.content);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    newBlock.content = e.target.value;
    setBlocks(newBlocks);
  };
  return (
    <textarea className="Editor" onChange={handleChange} value={content} />
  );
}
