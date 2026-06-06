import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ sessions: [] });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ created: true, data });
}
