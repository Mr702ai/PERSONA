import OpenAI from "openai";
import { personas } from "./personas";
import { scenarios } from "./scenarios";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export function buildSystemPrompt(personaId: string, scenarioId: string, difficulty: string) {
  const persona = personas.find(p => p.id === personaId) ?? personas[0];
  const scenario = scenarios.find(s => s.id === scenarioId) ?? scenarios[0];

  return `
You are roleplaying as a socially intelligent woman in a ${scenario.title} scenario.
Persona: ${persona.name}, ${persona.type}.
Traits: ${persona.traits.join(", ")}.
Difficulty: ${difficulty}.
Respond naturally. Do not instantly like the user.
If the user is needy, overexplains, or seeks approval, reduce warmth.
If the user is confident, humorous, curious, and emotionally aware, increase engagement.
Keep responses realistic, social, and immersive.
`;
}

export async function generateReply(args: {
  personaId: string;
  scenarioId: string;
  difficulty: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
}) {
  const system = buildSystemPrompt(args.personaId, args.scenarioId, args.difficulty);

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    messages: [
      { role: "system", content: system },
      ...args.messages
    ],
    temperature: 0.9
  });

  return completion.choices[0]?.message?.content ?? "…";
}