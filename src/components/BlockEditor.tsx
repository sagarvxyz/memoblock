import { Block } from '@prisma/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export default function BlockEditor({
  block,
  setBlocks,
}: {
  block: Block;
  setBlocks: Dispatch<SetStateAction<Block[]>>;
}) {
  const [content, setContent] = useState('');
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault;
    setContent(e.target.value);
  };
  return (
    <textarea
      className="Editor"
      onChange={handleChange}
      defaultValue={block.content}
      value={content}
    />
  );
}
