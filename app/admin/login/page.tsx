'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      document.cookie = `sb-auth-token=${data.token}; path=/; max-age=86400`;
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-gray to-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link href="/" className="flex justify-center mb-8">
            <span className="text-2xl font-bold text-forest-green">🏠 Admin</span>
          </Link>

          <h1 className="text-2xl font-bold text-charcoal mb-6 text-center">
            Panel Administrator
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                placeholder="admin@imobiliare.ro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Parolă
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-forest-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Se conectează...' : 'Conectare'}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm mt-6">
            <Link href="/" className="text-forest-green hover:underline">
              Înapoi la site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
