'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('rootwills_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    if (typeof document !== 'undefined') {
      if (newTheme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('rootwills_theme', nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-lg bg-obsidian-900 border border-cream/10 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to Fresh Light Mode' : 'Switch to Obsidian Dark Mode'}
      className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
        theme === 'dark'
          ? 'bg-obsidian-900 border-cream/15 text-champagne hover:border-champagne hover:bg-obsidian-800 shadow-sm'
          : 'bg-white border-zinc-300 text-amber-600 hover:border-amber-500 hover:bg-zinc-50 shadow-sm'
      } ${className}`}
      aria-label="Toggle visual theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-champagne transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
