import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [memos, setMemos] = useState([]);
  const [editorText, setEditorText] = useState('');
  return (
    <Component
      {...pageProps}
      memos={memos}
      setMemos={setMemos}
      editorText={editorText}
      setEditorText={setEditorText}
    />
  );
}
