import Editor from '@/components/Editor';
import { SetStateAction } from 'react';

export default function editor({
  editorText,
  setEditorText,
}: {
  editorText: string;
  setEditorText: React.Dispatch<SetStateAction<string>>;
}) {
  return <Editor editorText={editorText} setEditorText={setEditorText} />;
}
