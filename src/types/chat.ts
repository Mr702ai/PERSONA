export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type ChatSession = {
  id: string;
  userId?: string;
  scenarioId: string;
  personaId: string;
  difficulty: string;
  messages: ChatMessage[];
};