import '@/styles/globals.css';
import { Block, Memo } from '@prisma/client';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { MemoWithIdeaAndBlocks } from './api/memos/new';

export default function App({ Component, pageProps }: AppProps) {
  const [memos, setMemos] = useState<MemoWithIdeaAndBlocks[]>([]);
  const [markdown, setMarkdown] = useState('');
  return <Component {...pageProps} memos={memos} setMemos={setMemos} />;
}
