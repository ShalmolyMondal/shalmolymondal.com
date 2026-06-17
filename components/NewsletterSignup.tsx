'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<SubmitState>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState('loading');
        setMessage('');

        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const result = await response.json().catch(() => ({ message: 'Something went wrong. Please try again.' }));

        if (!response.ok) {
            setState('error');
            setMessage(result.message ?? 'Something went wrong. Please try again.');
            return;
        }

        setState('success');
        setEmail('');
        setMessage(result.message ?? 'Please check your inbox to confirm your subscription.');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-1 rounded-lg border border-[#727DA1]/20 bg-[#171926]/70 px-3 py-2.5 text-sm text-white placeholder:text-[#727DA1] outline-none transition-colors focus:border-[#818CF8]"
                />
                <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#818CF8] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <Send className="h-4 w-4" />
                    {state === 'loading' ? 'Joining' : 'Join'}
                </button>
            </div>
            {message && (
                <p className={`text-xs leading-relaxed ${state === 'error' ? 'text-red-300' : 'text-[#A5B4FC]'}`}>
                    {message}
                </p>
            )}
        </form>
    );
}
