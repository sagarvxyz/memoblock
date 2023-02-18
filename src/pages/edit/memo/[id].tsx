import Editor from '@/components/Editor';
import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import { SetStateAction } from 'react';

export default function editor({
  memos,
  editorText,
  setEditorText,
}: {
  memos: MemoWithIdeaAndBlocks[];
  editorText: string;
  setEditorText: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <Editor
      memos={memos}
      editorText={editorText}
      setEditorText={setEditorText}
    />
  );
}
