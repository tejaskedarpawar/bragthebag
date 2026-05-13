import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    clearError();
    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) navigate('/admin/dashboard');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal to-[#1A1A1A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-serif text-4xl text-cream lowercase tracking-tighter">
            bragthebag<span className="text-blush">.</span>
          </p>
          <p className="text-cream/40 text-xs tracking-[0.25em] uppercase mt-2">Admin Portal</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="font-serif text-2xl text-cream mb-1">Welcome back</h1>
          <p className="text-cream/40 text-sm mb-8">Sign in to access your dashboard.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-cream/50 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-cream/40 transition-colors"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-cream/50 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-cream/40 transition-colors"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                  aria-label="Toggle password"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-cream font-semibold py-3.5 rounded-xl hover:bg-forest/80 transition-colors text-sm tracking-widest uppercase flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24" />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-cream/20 text-xs mt-6">
            Demo: example@gmail.com / 123456789
          </p>
        </div>
      </div>
    </div>
  );
}
