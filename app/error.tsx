'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-gray to-white">
      <div className="text-center px-4 max-w-md">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-charcoal mb-4">
          Ceva nu a funcionat
        </h2>
        <p className="text-text-muted mb-8">
          A apărut o eroare. Te rog încearcă din nou mai târziu.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-forest-green text-white rounded-lg hover:bg-opacity-90 transition-all font-semibold"
          >
            Încearcă din nou
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-forest-green text-forest-green rounded-lg hover:bg-light-gray transition-all font-semibold"
          >
            Înapoi acasă
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-xs font-mono text-red-600">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
