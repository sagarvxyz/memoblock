import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import { SetStateAction, useState } from 'react';
import SaveButton from './SaveButton';

export default function Editor({
  memos,
  editorText,
  setEditorText,
}: {
  memos: MemoWithIdeaAndBlocks[];
  editorText: string;
  setEditorText: React.Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setEditorText(e.target.value);
  };
  return (
    <main>
      <SaveButton editorText={editorText} />
      <textarea className="Editor" onChange={handleChange} value={editorText} />
    </main>
  );
}
