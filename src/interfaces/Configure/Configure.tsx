export interface Configure {
  id: string;
  audio: boolean;
  englishText: boolean;
  vietnameseText: boolean;
  image: boolean;
  instruction: boolean;
}

export interface IAddConfigure {
  audio: boolean;
  englishText: boolean;
  vietnameseText: boolean;
  image: boolean;
  instruction: boolean;
}

export interface IQuestionConfigure {
  id: string;
  instruction: boolean;
  englishText: boolean;
  vietnameseText: boolean;
  image: boolean;
  audio: boolean;
}
export interface IOptionConfigure {
  id: string;
  instruction: boolean;
  englishText: boolean;
  vietnameseText: boolean;
  image: boolean;
  audio: boolean;
}
