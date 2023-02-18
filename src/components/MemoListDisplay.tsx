import { MemoMetadata } from '@/pages/api/memos';
import { Dispatch, SetStateAction } from 'react';
import MemoListButton from './MemoListButton';

export default function MemoListDisplay({ list }: { list: MemoMetadata[] }) {
  return (
    <ul className="MemoList">
      {list.map((memo) => (
        <li key={memo.id}>
          <MemoListButton memo={memo} />
        </li>
      ))}
    </ul>
  );
}
