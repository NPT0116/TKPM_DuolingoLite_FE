import { IBuildSentenceOption } from "../Options/IBuildSentenceOption";
import { IBaseQuestion } from "./IBaseQuestion";
import { IResource } from "../IResource";

export interface IBuildSentenceQuestion extends IBaseQuestion {
  options: IBuildSentenceOption[];
  words: IWord[];
}
export interface IWord {
  audio: IResource;
  order: number;
  word: string;
}
