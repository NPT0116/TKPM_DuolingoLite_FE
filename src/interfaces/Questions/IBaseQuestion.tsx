import { Configure } from "../Configure/Configure";
import { Resource } from "../Resource";

export interface IBaseQuestion {
  instruction: string;
  questionId: string;
  vietnameseText: string | null;
  picture: Resource | null;
  englishText: string;
  audio: Resource | null;
  questionConfigure: Configure;
  optionConfigure: Configure;
  order: number;
  type: string;
}
