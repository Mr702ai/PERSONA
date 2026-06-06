export type ScoreReport = {
  confidence: number;
  attraction: number;
  neediness: number;
  calibration: number;
  balance: number;
  flags: string[];
  suggestions: string[];
};