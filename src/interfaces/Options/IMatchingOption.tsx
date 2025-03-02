import { IResource } from "../IResource";
import { BaseOption } from "./IBaseOption";

export interface IMatchingOption extends BaseOption {
  order: number;
  vietnameseText: string;
  sourceType: string;
  targetType: string;
  englishText: string;
  image: IResource;
}
