// app/exhibitor/login/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api/exhibitorClient';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ExhibitorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('exhibitorToken');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  // app/exhibitor/login/page.tsx (update the handleSubmit function)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter email and password');
      setLoading(false);
      return;
    }

    try {
      const data = await authAPI.login(email, password);

      if (data.success) {
        const { token, exhibitor } = data.data;

        // Store token - use both keys for compatibility
        localStorage.setItem('tyre_expo_token', token);
        localStorage.setItem('exhibitorToken', token);
        localStorage.setItem('exhibitorData', JSON.stringify(exhibitor));

        toast.success(`Welcome back, ${exhibitor.name || exhibitor.company}!`);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
        toast.error(data.error || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || err.message || 'Network error. Please try again.');
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('gopinath2322002@gmail.com');
    setPassword('password123');
  };

  return (
    <div className="relative isolate flex w-full flex-1 items-start justify-center overflow-x-hidden bg-[#03193D] px-4 py-5 sm:items-center sm:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#CC9808] opacity-20 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#CC9808] opacity-10 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-sm border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:rounded-2xl sm:p-8">
          <div className="mb-5 text-center sm:mb-8">
            <Image
              src="/ITS_logo_white.png"
              alt="IndiaMet Expo"
              width={270}
              height={100}
              className="mx-auto mb-3 h-auto w-[150px] object-contain sm:mb-4 sm:w-[180px]"
            />
            <h2 className="font-bebas text-2xl tracking-wide text-white sm:text-3xl">
              IndiaMet Expo 2027
            </h2>
            <p className="mt-1 text-sm text-gray-300">Exhibitor Portal Login</p>
          </div>

          {error && (
            <div className="mb-4 rounded-sm border border-red-500/50 bg-red-500/20 p-3">
              <p className="text-center text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm border border-white/20 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-[#CC9808] focus:outline-none focus:ring-2 focus:ring-[#CC9808]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-white/20 bg-white px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 transition focus:border-[#CC9808] focus:outline-none focus:ring-2 focus:ring-[#CC9808]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-white/20 bg-white text-[#CC9808] focus:ring-[#CC9808]"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <Link
                href="/exhibitor/forgot-password"
                className="text-sm text-[#CC9808] transition hover:text-[#FFD154]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-[#CC9808] py-3 font-semibold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#FFD154] hover:text-[#03193D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-5 border-t border-white/10 pt-5 sm:mt-6 sm:pt-6">
            <p className="mb-3 text-center text-xs text-gray-400">Demo Credentials</p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex w-full flex-col items-center gap-1 text-sm text-gray-300 transition hover:text-white sm:flex-row sm:justify-center sm:gap-2"
            >
              <span className="break-all">gopinath2322002@gmail.com</span>
              <span className="hidden text-white/30 sm:inline">•</span>
              <span>exe123</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/exhibitor/register" className="text-[#CC9808] transition hover:text-[#FFD154]">
                Register as Exhibitor
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-500 sm:mt-8">
          © 2026 IndiaMet Expo. All rights reserved.
        </p>
      </div>
    </div>
  );
}