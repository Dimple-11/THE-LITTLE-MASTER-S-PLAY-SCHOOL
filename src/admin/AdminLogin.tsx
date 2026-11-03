import React, { useState } from 'react';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: (email: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          // If auth fails in supabase, allow fallback if matching master admin password
          if (password === 'playway123' || password === 'admin123') {
            onLoginSuccess(email);
            return;
          }
          setErrorMsg(error.message);
          return;
        }

        if (data.user) {
          onLoginSuccess(data.user.email || email);
          return;
        }
      } else {
        // Local mode authentication
        if (password === 'playway123' || password === 'admin123' || password.length >= 6) {
          onLoginSuccess(email || 'admin@thelittlemasters.edu.in');
        } else {
          setErrorMsg('Please enter a password with at least 6 characters (or use demo: playway123)');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@thelittlemasters.edu.in');
    setPassword('playway123');
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-4 border-brand-yellow rounded-5xl p-8 shadow-card relative overflow-hidden">
        {/* Emblem */}
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="The Little Master's Play Way School"
            className="w-20 h-20 mx-auto object-contain drop-shadow-md mb-2"
          />
          <h1 className="text-2xl md:text-3xl font-bubble text-brand-brown">
            School Administration
          </h1>
          <p className="text-stone-500 text-xs font-semibold mt-1">
            Sign in to manage admissions, gallery, notices & settings
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-brand-red text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thelittlemasters.edu.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 focus:border-brand-orange text-sm font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 focus:border-brand-orange text-sm font-medium outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-base font-bold shadow-playful-orange hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? <span>Signing In...</span> : <span>Enter Administration Portal</span>}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="mt-6 pt-5 border-t border-brand-cream text-center space-y-2">
          <p className="text-xs text-stone-500 font-medium">Demo or Evaluation Login:</p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="px-4 py-1.5 rounded-full bg-brand-peach/80 hover:bg-brand-yellow/50 text-brand-deepOrange font-bubble text-xs font-bold border border-brand-orange/30 transition-all cursor-pointer"
          >
            ⚡ Auto-fill Default Demo Credentials
          </button>
          <p className="text-[11px] text-stone-400">
            Email: <code className="bg-brand-cream px-1 py-0.5 rounded">admin@thelittlemasters.edu.in</code> | Pass: <code className="bg-brand-cream px-1 py-0.5 rounded">playway123</code>
          </p>
        </div>
      </div>
    </div>
  );
};
