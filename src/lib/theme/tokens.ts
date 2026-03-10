import { adventureTheme } from '@/src/lib/theme/adventure';
import { modernTheme } from '@/src/lib/theme/modern';
import type { ThemeMode } from '@/src/shared/schemas/user';

export const THEME_COOKIE_NAME = 'life-quest-theme';

const themeMap = {
  modern: modernTheme,
  adventure: adventureTheme,
} satisfies Record<ThemeMode, Record<string, string>>;

export function resolveThemeMode(value: string | undefined | null): ThemeMode {
  return value === 'adventure' ? 'adventure' : 'modern';
}

export function buildThemeStyleText() {
  return Object.entries(themeMap)
    .map(([mode, palette]) => {
      const declarations = Object.entries(palette)
        .map(([token, tokenValue]) => `--${token}: ${tokenValue};`)
        .join('');

      return `html[data-theme="${mode}"] { ${declarations} }`;
    })
    .join('\n');
}
