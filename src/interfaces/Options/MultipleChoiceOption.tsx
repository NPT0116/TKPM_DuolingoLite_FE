import { Resource } from "../Resource";
import { BaseOption } from "./BaseOption";

export interface MultipleChoiceOption extends BaseOption {
  isCorrect: boolean;
  vietnameseText: string | null;
  englishText: string | null;
  image: Resource | null;
  audio: Resource | null;
}
