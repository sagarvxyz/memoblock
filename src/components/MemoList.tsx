import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import { Memo } from '@prisma/client';
import Link from 'next/link';

export default function MemoList({
  memos,
}: {
  memos: MemoWithIdeaAndBlocks[];
}) {
  return (
    <ul>
      {memos.map((memo) => (
        <li key={memo.id}>
          <Link href={`/memos/${memo.id}`}>{memo.metadata.title}</Link>
        </li>
      ))}
    </ul>
  );
}
