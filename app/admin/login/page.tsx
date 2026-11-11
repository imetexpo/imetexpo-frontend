"use client";

import { useState, FormEvent } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, loading, error: authError } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
  
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login successful!');
      const next = typeof window !== 'undefined' 
        ? new URLSearchParams(window.location.search).get('next') 
        : null;
      router.push(next === '/scanner' ? '/scanner' : (next || '/admin/dashboard'));
    } else {
      const errorMsg = result.error || 'Invalid email or password';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const displayedError = error || authError;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#003A77] to-[#00A1B1] flex items-center justify-center shadow-lg shadow-[#003A77]/25 ring-4 ring-[#00A1B1]/10">
            <Lock className="h-7 w-7 text-white" />
          </div>
        </div>
        <h2 className="mt-5 text-center text-3xl font-extrabold text-[#003A77] tracking-tight">
          Admin Panel Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Use your credentials to access the IndiaMET exhibition management system
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-5 sm:px-10 shadow-xl shadow-slate-200/60 rounded-2xl border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className="appearance-none block w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg shadow-xs placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white text-sm transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className="appearance-none block w-full pl-10 pr-11 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg shadow-xs placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white text-sm transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {displayedError && (
              <div className="rounded-lg bg-red-50 border border-red-200/80 p-3.5 animate-in fade-in duration-200">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                  <div className="ml-2.5">
                    <p className="text-sm font-medium text-red-800">{displayedError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md shadow-[#003A77]/15 text-sm font-semibold text-white bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002c5c] hover:to-[#003A77] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A1B1] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
