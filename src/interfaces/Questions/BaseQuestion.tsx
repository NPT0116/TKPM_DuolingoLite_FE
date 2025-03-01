import { Configure } from "../Configure/Configure";

export interface BaseQuestion {
  instruction: string;
  questionId: string;
  vietnameseText: string | null;
  pictureId: string | null;
  englishText: string;
  audioId: string | null;
  questionConfigure: Configure;
  optionConfigure: Configure;
  order: number;
  type: string;
}
