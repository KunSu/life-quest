import { NextResponse } from 'next/server';

import { updateDemoUserTheme } from '@/src/server/user/service';
import { updateThemeSchema } from '@/src/shared/schemas/user';

export async function PATCH(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: 'invalid_input',
          message: 'Invalid theme payload',
        },
      },
      { status: 400 },
    );
  }

  const parsed = updateThemeSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'invalid_input',
          message: 'Invalid theme payload',
        },
      },
      { status: 400 },
    );
  }

  const data = updateDemoUserTheme(parsed.data.themeMode);
  const response = NextResponse.json({ data });

  response.cookies.set('life-quest-theme', data.themeMode, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
