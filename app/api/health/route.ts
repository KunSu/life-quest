import { NextResponse } from 'next/server';

import { bootstrapDatabase } from '@/src/db/client';

export function GET() {
  try {
    bootstrapDatabase();

    return NextResponse.json({
      data: {
        status: 'ok',
        app: 'life-quest',
        storage: 'sqlite',
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: 'internal_error',
          message: 'Internal server error',
        },
      },
      { status: 500 },
    );
  }
}
