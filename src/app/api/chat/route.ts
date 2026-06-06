import { NextResponse } from "next/server";
import { generateReply } from "@/lib/openai";

export async function POST(req: Request) {
  const body = await req.json();
  const reply = await generateReply(body);

  return NextResponse.json({ reply });
}