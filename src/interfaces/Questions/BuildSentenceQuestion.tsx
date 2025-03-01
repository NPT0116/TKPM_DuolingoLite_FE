import { BuildSentenceOption } from "../Options/BuildSentenceOption";
import { BaseQuestion } from "./BaseQuestion";

export interface BuildSentenceQuestion extends BaseQuestion {
  options: BuildSentenceOption[];
}
