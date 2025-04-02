import {
  IAddMultipleChoiceOption,
  IMultipleChoiceOption,
} from "../Options/IMultipleChoiceOption";
import { IAddBaseQuestion, IBaseQuestion } from "./IBaseQuestion";
import { IWord } from "./IPronunciationQuesion";

export interface IMultipleChoiceQuestion extends IBaseQuestion {
  options: IMultipleChoiceOption[];
  words: IWord[];
}

export interface IAddMultipleChoiceQuestion extends IAddBaseQuestion {
  options: IAddMultipleChoiceOption[];
}
