import { QuestionType } from "../../enums/questionType";
import { Configure, IAddConfigure } from "../Configure/Configure";
import { IResource } from "../IResource";
import { IAddOption } from "../Options/IBaseOption";

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

export interface IAddQuestion {
  instruction: string;
  vietnameseText: string | null;
  englishText: string;
  sentence: string;
  image: string | null;
  audio: string | null;
  order: number;
  type: QuestionType;
  questionConfiguration: IAddConfigure;
  optionConfiguration: IAddConfigure;
  options: IAddOption[];
}
