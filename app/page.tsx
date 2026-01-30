'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import GenLayerLogo from '../components/GenLayerLogo';

const highlights = [
  'Play or practice alongside GenLayer validators in seconds.',
  'Watch consensus confidence grow and trigger appeals when you doubt.',
  'Track XP, accuracy, and appeal streaks across every session.'
];

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState<'single' | 'multi'>('single');

  const [errorMessage, setErrorMessage] = useState('');

  const handleStart = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeName = username.trim();
    if (!safeName) {
      setErrorMessage('Please enter your username before continuing.');
      return;
    }
    setErrorMessage('');
    router.push(`/game?mode=${mode}&username=${encodeURIComponent(safeName)}`);
  };

  return (
    <main className="min-h-screen bg-genlayer-dark text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <section className="card-gradient rounded-3xl p-8 space-y-6">
          <GenLayerLogo variant="white" />
          <p className="text-xs uppercase tracking-[0.5em] text-genlayer-accent">GenLayer · Trust or Doubt</p>
          <h1 className="text-4xl md:text-5xl font-bold">Choose your lane</h1>
          <p className="text-lg text-gray-200">
            Enter your handle, pick single-player practice or dive into multiplayer, and let GenLayer’s validators guide every vote.
          </p>
          <form className="space-y-4" onSubmit={handleStart}>
            <label className="block text-sm uppercase tracking-[0.3em] text-white/60">Username</label>
            <div>
              <input
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-white/30 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:border-genlayer-blue focus:outline-none"
              />
              {errorMessage && <p className="mt-2 text-xs text-genlayer-accent">{errorMessage}</p>}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setMode('single')}
                className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${
                  mode === 'single' ? 'bg-genlayer-blue text-white border-genlayer-blue' : 'border-white/20 text-white/60'
                }`}
              >
                Single player
              </button>
              <button
                type="button"
                onClick={() => setMode('multi')}
                className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${
                  mode === 'multi' ? 'bg-genlayer-blue text-white border-genlayer-blue' : 'border-white/20 text-white/60'
                }`}
              >
                Multiplayer
              </button>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-genlayer-purple to-genlayer-blue px-6 py-4 text-base font-semibold tracking-[0.2em] text-white"
            >
              Enter {mode === 'single' ? 'single-player' : 'multiplayer'}
            </button>
          </form>
        </section>
        <section className="grid gap-5 md:grid-cols-3">
          {highlights.map((text) => (
            <article key={text} className="card-gradient rounded-3xl p-5 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-genlayer-accent">Insight</p>
              <p className="mt-3 text-sm text-gray-200">{text}</p>
            </article>
          ))}
        </section>
        <section className="card-gradient rounded-3xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">How the session flows</h2>
          <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
            <li>Enter your username and choose single or multiplayer before you start.</li>
            <li>Face a live claim, vote trust or doubt, and optionally appeal before the consensus finalizes.</li>
            <li>Review the answers and leaderboard after every round set to learn how the validators think.</li>
          </ol>
        </section>
        <section className="card-gradient rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-3xl font-black tracking-[0.55em] uppercase text-white leading-none">G E N L A Y E R</p>
          <p className="text-base font-semibold text-genlayer-blue tracking-[0.2em]">
            The trust infrastructure for AI-driven decisions.
          </p>
          <p className="text-sm text-gray-400 max-w-xl">
            Rooted in live consensus, GenLayer teaches you when to trust, when to doubt, and how to appeal.
          </p>
        </section>
      </div>
    </main>
  );
}
