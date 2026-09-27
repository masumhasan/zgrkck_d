import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/layout/Logo';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('admin@mealist.ai');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login();
    }, 400);
  };

  return (
    <div className="bg-[#F8F6F1] min-h-screen flex items-center justify-center p-4 antialiased selection:bg-[#3B6B55]/10">
      <main className="w-full max-w-[420px] bg-white rounded-md border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.03)] px-10 py-12">
        {/* Brand Header */}
        <header className="text-center mb-7">
          <div className="flex justify-center mb-4">
            <Logo size="large" showSubtitle={false} />
          </div>
          <p className="text-[10px] tracking-[0.14em] uppercase font-semibold text-[#3B6B55] mb-1.5">
            ADMIN PORTAL
          </p>
          <h2 className="font-editorial text-[25px] font-bold text-gray-800 mb-1.5">
            Welcome back
          </h2>
          <p className="text-[13px] text-[#5F6368]">
            Sign in to manage Mealist.ai.
          </p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-[11px] font-semibold text-gray-800 mb-1.5 uppercase tracking-wider"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-[4px] border border-gray-200 px-3.5 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 focus:border-[#3B6B55] focus:outline-none focus:ring-1 focus:ring-[#3B6B55] transition-colors"
            />
          </div>

          <div>
            <label
              className="block text-[11px] font-semibold text-gray-800 mb-1.5 uppercase tracking-wider"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-[4px] border border-gray-200 px-3.5 py-2.5 pr-10 text-[13px] tracking-wider text-gray-800 placeholder-gray-400 focus:border-[#3B6B55] focus:outline-none focus:ring-1 focus:ring-[#3B6B55] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
                aria-label="Toggle password visibility"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full bg-[#3B6B55] hover:bg-[#325C48] rounded-[4px] py-2.5"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => alert('Password reset link sent to admin email.')}
              className="text-[11px] font-semibold text-[#3B6B55] hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
