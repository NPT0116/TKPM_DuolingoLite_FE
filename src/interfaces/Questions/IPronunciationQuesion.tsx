import { IBaseQuestion } from "./IBaseQuestion";
import { IResource } from "../IResource";

export interface IWord {
  audio: IResource;
  order: number;
  word: string;
}

export interface IPronunciationQuestion extends IBaseQuestion {
  options: [];
  words: IWord[];
}
