import { MemoModel } from '@/common/types';
import { MemoListButton } from './MemoListButton';

export function MemoList({
  list,
}: {
  list: Pick<MemoModel, 'id' | 'metadata'>[];
}) {
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
