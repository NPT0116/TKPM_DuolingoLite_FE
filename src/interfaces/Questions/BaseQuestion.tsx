export interface BaseQuestion {
  instruction: string;
  questionId: string;
  vietnameseText: string | null;
  pictureId: string | null;
  englishText: string;
  audioId: string | null;
  questionConfigureId: string;
  optionConfigureId: string;
  order: number;
}
