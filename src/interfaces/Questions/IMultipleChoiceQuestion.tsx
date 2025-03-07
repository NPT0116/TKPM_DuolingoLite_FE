import { IMultipleChoiceOption } from "../Options/IMultipleChoiceOption";
import { IBaseQuestion } from "./IBaseQuestion";
import { IWord } from "./IPronunciationQuesion";

export interface IMultipleChoiceQuestion extends IBaseQuestion {
  options: IMultipleChoiceOption[];
  words: IWord[];
}
