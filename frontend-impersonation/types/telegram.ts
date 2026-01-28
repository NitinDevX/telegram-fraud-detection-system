export interface TelegramResult {
  name: string;
  username: string;
  risk: number;
  verdict: string;
  riskReasons: string[];
  officialConfidence: number;
  officialReasons: string[];
  links: string[];
  sampleMessage: string;
  image: string;
  tme: string;
}