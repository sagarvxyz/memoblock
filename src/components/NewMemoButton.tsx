import { useRouter } from 'next/router';

export default function NewMemoButton() {
  const router = useRouter();
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await fetch('/api/memos/new', { method: 'POST' });
    const data = await res.json();
    console.log(data);
    const { id } = data;
    const url = `/edit/memo/${id}`;
    router.push(url);
  };

  return <button onClick={handleClick}>+</button>;
}
