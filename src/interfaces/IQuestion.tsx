import { IQuestionConfigure, IOptionConfigure } from "./Configure";
export interface IError {
  code: string;
  description: string;
  type: number;
}
export interface IQuestion {
  instruction: string;
  questionId: string;
  type: string;
  order: number;
  vietnameseText: string;
  englishText: string;
  picture: string | null;
  audio: string | null;
  questionConfigure: IQuestionConfigure;
  optionConfigure: IOptionConfigure;
  options: IOption[];
}
export interface IOption {
  isCorrect: boolean;
  optionId: string;
  vietnameseText: string;
  englishText: string;
}
export interface IQuestionResponse {
  value: IQuestion;
  isSuccess: boolean;
  isFailure: boolean;
  error: IError;
}
