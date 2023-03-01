import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function MemoNewButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchMemo = async () => {
    const res = await fetch('/api/memos/new', { method: 'POST' });
    return res.json();
  };
  const mutation = useMutation({
    mutationFn: fetchMemo,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['memo', data.id], data);
      const url = `/edit/memo/${data.id}`;
      router.push(url);
    },
  });
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await mutation.mutate();
  };

  return <button onClick={handleClick}>+</button>;
}
