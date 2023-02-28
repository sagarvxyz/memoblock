import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function NewMemoButton() {
  const router = useRouter();
  const fetchMemo = async () => {
    const res = await fetch('/api/memos/new', { method: 'POST' });
    return res.json();
  };
  const mutation = useMutation({
    mutationFn: fetchMemo,
    onSuccess: (data, variables, context) => {
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
