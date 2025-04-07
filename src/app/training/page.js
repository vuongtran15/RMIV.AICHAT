'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrainingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/training/home');
  }, [router]);

  return null;
} 