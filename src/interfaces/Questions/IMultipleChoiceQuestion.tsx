import { IMultipleChoiceOption } from "../Options/IMultipleChoiceOption";
import { IBaseQuestion } from "./IBaseQuestion";

export interface IMultipleChoiceQuestion extends IBaseQuestion {
  options: IMultipleChoiceOption[];
}
