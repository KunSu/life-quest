import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { getDemoUserTheme } from '@/src/server/user/service';
import {
  THEME_COOKIE_NAME,
  buildThemeStyleText,
  resolveThemeMode,
} from '@/src/lib/theme/tokens';

import './globals.css';

export const metadata: Metadata = {
  title: 'Life Quest',
  description: 'Life Quest MVP',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const themeMode = cookieTheme
    ? resolveThemeMode(cookieTheme)
    : getDemoUserTheme();

  return (
    <html lang="en" data-theme={themeMode} suppressHydrationWarning>
      <head>
        <style id="theme-tokens">{buildThemeStyleText()}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
