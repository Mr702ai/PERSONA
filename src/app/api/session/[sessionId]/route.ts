import { NextResponse } from 'next/server';

interface Params {
  params: { sessionId: string };
}

export async function GET(_request: Request, { params }: Params) {
  return NextResponse.json({ sessionId: params.sessionId, status: 'active' });
}
