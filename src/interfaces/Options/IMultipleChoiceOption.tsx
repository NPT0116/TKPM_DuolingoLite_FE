import { Resource } from "../Resource";
import { BaseOption } from "./IBaseOption";

export interface IMultipleChoiceOption extends BaseOption {
  isCorrect: boolean;
  vietnameseText: string | null;
  englishText: string | null;
  image: Resource | null;
  audio: Resource | null;
}
