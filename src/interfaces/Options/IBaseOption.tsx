import { MatchingQuestionOptionType } from "../../enums/matchingQuestionType";
import { IResource } from "../IResource";

export interface BaseOption {
  optionId: string | null;
}

export interface IOption {
  id: string;
  vietNameseText: string;
  englishText: string;
  image: IResource | null;
  audio: IResource | null;
}

export interface IAddOption {
  order: number;
  optionId: string;
  isCorrect: boolean;
  sourceType: MatchingQuestionOptionType | null;
  targetType: MatchingQuestionOptionType | null;
  position: number | null;
}

export interface IAddNewOption {
  optionId: string | null;
  vietnameseText: string | null;
  image: string | null;
  audio: string | null;
  englishText: string | null;
  needAudio: boolean;
  needImage: boolean;
}
