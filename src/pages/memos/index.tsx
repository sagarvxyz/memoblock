import MemoListDisplay from '@/components/MemoListDisplay';
import NewMemoButton from '@/components/NewMemoButton';
import { useQuery } from '@tanstack/react-query';

export default function MemoListPage() {
  const fetchMemoList = async () => {
    const res = await fetch('/api/memos');
    return res.json();
  };
  const { data, isLoading } = useQuery(['memoList'], fetchMemoList);
  let list = [];
  if (!isLoading) {
    list = data;
  }
  return (
    <main>
      <h2>Memos</h2>
      <MemoListDisplay list={list} />
      <NewMemoButton />
    </main>
  );
}
