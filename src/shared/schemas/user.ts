import { z } from 'zod';

export const themeModes = ['modern', 'adventure'] as const;

export const updateThemeSchema = z.object({
  themeMode: z.enum(themeModes),
});

export type ThemeMode = (typeof themeModes)[number];
export type UpdateThemeInput = z.infer<typeof updateThemeSchema>;
