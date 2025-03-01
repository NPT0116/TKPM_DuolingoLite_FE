import { IBuildSentenceOption } from "../Options/IBuildSentenceOption";
import { IBaseQuestion } from "./IBaseQuestion";

export interface IBuildSentenceQuestion extends IBaseQuestion {
  options: IBuildSentenceOption[];
}
