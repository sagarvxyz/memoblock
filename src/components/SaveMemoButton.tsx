import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { MouseEvent } from 'react';

export default function SaveMemoButton({ memo, blocks }) {
  const router = useRouter();
  const { id } = router.query;

  const fetchMemo = async (data) => {
    const body = JSON.parse(JSON.stringify(data));
    const res = await fetch(`/api/memos/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return res.json();
  };
  let newId = '';
  const mutation = useMutation({
    mutationFn: fetchMemo,
    onSuccess: (data, variables, context) => {
      const url = `/memos/${data.id}`;
      router.push(url);
    },
  });
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    const updatedMemo = { ...memo, blocks };
    await mutation.mutate(updatedMemo);
  };

  return <button onClick={handleClick}>Save</button>;
}
