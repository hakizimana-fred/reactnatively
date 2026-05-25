import type { Metadata } from 'next';
import { PlaygroundClient } from './PlaygroundClient';
import { Navigation } from '@/components/shared/Navigation';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Interactive component playground for Reactnatively.',
};

export default function PlaygroundPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen">
        <PlaygroundClient />
      </main>
    </>
  );
}
