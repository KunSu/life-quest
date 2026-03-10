'use client';

import { startTransition, useState } from 'react';

import type { ThemeMode } from '@/src/shared/schemas/user';

type ThemeSwitcherProps = {
  initialTheme: ThemeMode;
};

export function ThemeSwitcher({ initialTheme }: ThemeSwitcherProps) {
  const [themeMode, setThemeMode] = useState(initialTheme);
  const [isPending, setIsPending] = useState(false);
  const nextTheme = themeMode === 'modern' ? 'adventure' : 'modern';

  async function handleToggle() {
    setIsPending(true);

    try {
      const response = await fetch('/api/user/theme', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ themeMode: nextTheme }),
      });

      if (!response.ok) {
        return;
      }

      startTransition(() => {
        document.documentElement.dataset.theme = nextTheme;
        setThemeMode(nextTheme);
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={`Switch to ${nextTheme}`}
    >
      Theme: {themeMode}
    </button>
  );
}
