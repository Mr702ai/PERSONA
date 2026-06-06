import { Scenario } from "@/types/persona";

export const scenarios: Scenario[] = [
  { id: "coffee-date", title: "Coffee Date", description: "A low-pressure first date setting.", environment: "casual" },
  { id: "rooftop-drinks", title: "Rooftop Drinks", description: "Higher status, more flirtation and pacing.", environment: "premium" },
  { id: "dating-app-msg", title: "Dating App Messaging", description: "Text chemistry, tease, and momentum.", environment: "digital" },
  { id: "reconnect-flake", title: "Reconnecting After Flake", description: "Recover from a weak interaction or no-show.", environment: "recovery" },
  { id: "networking", title: "Business Networking", description: "Social confidence in a professional context.", environment: "professional" }
];