import { MatchingQuestionOptionType } from "../../enums/matchingQuestionType";

export interface BaseOption {
  optionId: string | null;
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
  vietnameseText: string;
  image: string | null;
  audio: string | null;
  englishText: string;
  needAudio: boolean;
}
