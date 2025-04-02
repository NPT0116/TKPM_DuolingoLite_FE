import { Configure, IAddConfigure } from "../Configure/Configure";
import { IResource } from "../IResource";

export interface IBaseQuestion {
  instruction: string;
  questionId: string;
  vietnameseText: string | null;
  picture: IResource | null;
  englishText: string;
  audio: IResource | null;
  questionConfigure: Configure;
  optionConfigure: Configure;
  order: number;
  type: string;
}

export interface IAddBaseQuestion {
  instruction: string;
  vietnameseText: string | null;
  image: IResource | null;
  englishText: string;
  audio: IResource | null;
  questionConfiguration: IAddConfigure;
  optionConfiguration: IAddConfigure;
  order: number;
  type: string;
}
