import { cookies } from 'next/headers';

import { AppShell } from '@/components/shared/app-shell';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { bootstrapDatabase } from '@/src/db/client';
import { getDemoUserTheme } from '@/src/server/user/service';
import { THEME_COOKIE_NAME, resolveThemeMode } from '@/src/lib/theme/tokens';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  bootstrapDatabase();
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const themeMode = cookieTheme ? resolveThemeMode(cookieTheme) : getDemoUserTheme();

  return (
    <AppShell
      eyebrow="Dashboard"
      title="Life Quest"
      description="A mobile-first shell for the Life Quest MVP."
      action={<ThemeSwitcher initialTheme={themeMode} />}
    />
  );
}
