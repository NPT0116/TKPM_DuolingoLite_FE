import { Configure } from "../Configure/Configure";
import { IResource } from "../IResource";

export interface IBaseQuestion {
  instruction: string;
  questionId: string;
  vietnameseText: string | null;
  picture: IResource | null;
  englishText: string;
  audio: IResource | null;
  questionConfigure: Configure;
  optionConfigure: Configure;
  order: number;
  type: string;
}
