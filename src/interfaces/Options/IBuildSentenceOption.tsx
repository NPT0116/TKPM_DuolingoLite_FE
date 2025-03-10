import { IResource } from "../IResource";
import { BaseOption } from "./IBaseOption";

export interface IBuildSentenceOption extends BaseOption {
  englishText: string | null;
  vietnameseText: string | null;
  order: number;
  image: IResource | null;
  audio: IResource | null;
}
