import { Block } from '@prisma/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export default function BlockEditor({
  id,
  blocks,
  setBlocks,
}: {
  id: Block['id'];
  blocks: Block[];
  setBlocks: Dispatch<SetStateAction<Block[]>>;
}) {
  const newBlocks = JSON.parse(JSON.stringify(blocks));
  const i = newBlocks.findIndex((block: Block) => block.id === id);
  const newBlock = newBlocks[i];
  const [content, setContent] = useState(newBlock.content);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault;
    setContent(e.target.value);
    newBlock.content = content;
    setBlocks(newBlocks);
  };
  return (
    <textarea className="Editor" onChange={handleChange} value={content} />
  );
}
