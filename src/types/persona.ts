export type Persona = {
  id: string;
  name: string;
  type: string;
  traits: string[];
  difficulty: "easy" | "medium" | "hard" | "expert";
  flirtStyle: string;
  responseSpeed: "fast" | "measured" | "slow";
  likes: string[];
  dislikes: string[];
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  environment: string;
};