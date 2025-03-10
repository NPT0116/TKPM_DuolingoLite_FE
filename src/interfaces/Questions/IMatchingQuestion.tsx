import { IMatchingOption } from "../Options/IMatchingOption";
import { IBaseQuestion } from "./IBaseQuestion";

export interface IMatchingQuestion extends IBaseQuestion {
  options: IMatchingOption[];
}
