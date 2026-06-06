import { NextResponse } from "next/server";
import { scoreConversation } from "@/lib/scoring";

export async function POST(req: Request) {
  const body = await req.json();
  const report = scoreConversation(body.messages || []);
  return NextResponse.json(report);
}