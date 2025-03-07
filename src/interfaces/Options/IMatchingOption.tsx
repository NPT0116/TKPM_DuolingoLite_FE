import { IResource } from "../IResource";
import { BaseOption } from "./IBaseOption";

export interface IMatchingOption extends BaseOption {
  order: number;
  audio: IResource;
  vietnameseText: string;
  sourceType: string;
  targetType: string;
  englishText: string;
  image: IResource;
}
export interface IVNContent {
  optionId: string;
  sourceType: string;
  vietnameseText: string;
}
export interface IELContent {
  optionId: string;
  targetType: string;
  englishText: string;
  audio: IResource;
}
