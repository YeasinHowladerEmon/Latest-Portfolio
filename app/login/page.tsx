'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ChevronRight, AlertCircle } from 'lucide-react';
import { LoginScene3D } from '@/components/Home/LoginScene3D';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Identity verification failed.');
      }

      // Success - Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || "Connection to mainframe denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030213] text-white font-sans selection:bg-fuchsia-500/30 selection:text-fuchsia-200">

      {/* 3D Background */}
      <LoginScene3D />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* Card Frame */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">

            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-50" />

            <div className="p-8 md:p-10">

              {/* Header */}
              <div className="mb-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 inline-flex items-center justify-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-lime-400 border border-lime-400/20"
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
                  SECURE GATEWAY v3.0
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                  Welcome Back
                </h1>
                <p className="mt-4 text-base text-zinc-400">
                  Enter your credentials to access the mainframe.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Neural Link ID (Email)
                  </Label>
                  <div className="relative group">
                    <div className="absolute left-4 top-4 text-zinc-500 transition-colors group-focus-within:text-lime-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="operative@cyber.net"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pl-12 text-base bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-lime-400/50 focus:ring-lime-400/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                      Passcode
                    </Label>
                    <a href="#" className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                      Forgot code?
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-4 text-zinc-500 transition-colors group-focus-within:text-fuchsia-500">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 pl-12 text-base bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-fuchsia-500/50 focus:ring-fuchsia-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 text-base text-red-400 bg-red-400/10 p-4 rounded-md border border-red-400/20"
                  >
                    <AlertCircle className="h-5 w-5" />
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-black font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_-5px_rgba(163,230,53,0.5)] border-none"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      AUTHENTICATING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      INITIATE SEQUENCE <ChevronRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>

              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-600">
                  Restricted Access. Unauthorized entry attempts will be logged and reported to CyberSec.
                </p>
              </div>

            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div
            className="absolute -right-12 -top-12 h-24 w-24 rounded-full border border-lime-400/20 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full border border-fuchsia-500/20 opacity-20"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

        </motion.div>
      </div>
    </div>
  );
}
