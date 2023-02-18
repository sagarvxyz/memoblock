import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SetStateAction } from 'react';

export default function EditButton({
  id,
  memos,
  setEditorText,
}: {
  id: string;
  memos: MemoWithIdeaAndBlocks[];
  setEditorText: React.Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const handleClick = () => {
    const activeMemo = memos.filter((memo) => memo.id === id)[0];
    const content = activeMemo.content;
    setEditorText(content);
    const url = `/edit/memo/${id}`;
    router.push(url);
  };
  return <button onClick={handleClick}>Edit</button>;
}
