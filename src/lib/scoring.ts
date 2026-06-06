import { ScoreReport } from "@/types/score";

export function scoreConversation(messages: { role: string; content: string }[]): ScoreReport {
  const joined = messages.map(m => m.content.toLowerCase()).join(" ");
  const overexplaining = (joined.match(/because|actually|just to explain|sorry/g) || []).length;
  const questions = (joined.match(/\?/g) || []).length;
  const compliments = (joined.match(/beautiful|amazing|gorgeous|perfect/g) || []).length;

  const confidence = Math.max(20, 80 - overexplaining * 8);
  const attraction = Math.max(15, 50 + compliments * 5 - questions * 2);
  const neediness = Math.min(95, overexplaining * 12);
  const calibration = Math.max(20, 70 - Math.max(0, questions - 6) * 4);
  const balance = Math.max(20, 75 - Math.abs(messages.filter(m => m.role === "user").length - messages.filter(m => m.role === "assistant").length) * 5);

  const flags = [
    ...(overexplaining > 2 ? ["Overexplaining"] : []),
    ...(questions > 8 ? ["Interview mode"] : []),
    ...(neediness > 50 ? ["Approval seeking"] : [])
  ];

  const suggestions = [
    ...(overexplaining > 2 ? ["Use shorter responses and leave some space."] : []),
    ...(questions > 8 ? ["Ask fewer interview-style questions."] : []),
    ...(compliments > 3 ? ["Replace compliments with playful tension or curiosity."] : []),
    "Lead the conversation with cleaner pacing."
  ];

  return { confidence, attraction, neediness, calibration, balance, flags, suggestions };
}