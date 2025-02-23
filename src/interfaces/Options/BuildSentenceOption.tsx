import { BaseOption } from "./BaseOption";

export interface BuildSentenceOption extends BaseOption {
  englishText: string | null;
  vietnameseText: string | null;
  order: number;
}
