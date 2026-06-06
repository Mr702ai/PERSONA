import { Persona } from "@/types/persona";

export const personas: Persona[] = [
  {
    id: "sophia",
    name: "Sophia",
    type: "Luxury Feminine",
    traits: ["playful", "high standards", "emotionally intelligent", "socially experienced"],
    difficulty: "hard",
    flirtStyle: "subtle",
    responseSpeed: "measured",
    likes: ["confidence", "humor", "ambition"],
    dislikes: ["neediness", "oversharing", "trying too hard"]
  },
  {
    id: "maya",
    name: "Maya",
    type: "Warm Intellectual",
    traits: ["curious", "empathetic", "thoughtful", "observant"],
    difficulty: "medium",
    flirtStyle: "light",
    responseSpeed: "measured",
    likes: ["storytelling", "emotional intelligence", "good questions"],
    dislikes: ["robotic interviewing", "generic compliments"]
  },
  {
    id: "zuri",
    name: "Zuri",
    type: "Sharp Social Elite",
    traits: ["selective", "witty", "direct", "high calibration"],
    difficulty: "expert",
    flirtStyle: "minimal",
    responseSpeed: "slow",
    likes: ["precision", "humor", "social awareness"],
    dislikes: ["pressure", "overexplaining", "approval seeking"]
  }
];