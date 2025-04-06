import { IResource } from "../IResource";
import { BaseOption } from "./IBaseOption";

export interface IMatchingOption extends BaseOption {
  order: number;
  audio: IResource;
  vietnameseText: string;
  sourceType: string;
  targetType: string;
  englishText: string;
  image: null;
}
export interface IVNContent {
  optionId: string | null;
  sourceType: string;
  vietnameseText: string;
}
export interface IELContent {
  optionId: string | null;
  targetType: string;
  englishText: string;
  audio: IResource;
}
