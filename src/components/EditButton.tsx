import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

export default function EditButton() {
  const router = useRouter();
  const { id } = router.query;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    const url = `/edit/memo/${id}`;
    router.push(url);
  };
  return <button onClick={handleClick}>Edit</button>;
}
