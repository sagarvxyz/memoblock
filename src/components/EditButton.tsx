import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SetStateAction } from 'react';

export default function EditButton({
  memos,
}: {
  memos: MemoWithIdeaAndBlocks[];
}) {
  const router = useRouter();
  const { id } = router.query;
  const activeMemo = memos.filter((memo) => memo.id === id)[0];
  const handleClick = () => {
    const content = activeMemo.content;
    const url = `/edit/memo/${id}`;
    router.push(url);
  };
  return <button onClick={handleClick}>Edit</button>;
}
