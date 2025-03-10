import { IResource } from "../IResource";
import { BaseOption } from "./IBaseOption";

export interface IMultipleChoiceOption extends BaseOption {
  isCorrect: boolean;
  vietnameseText: string | null;
  englishText: string | null;
  image: IResource | null;
  audio: IResource | null;
}
