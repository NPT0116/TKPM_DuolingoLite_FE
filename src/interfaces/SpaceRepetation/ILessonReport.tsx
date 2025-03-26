export interface ILessonReport {
  userId: string;
  lessonId: string;
  results: IQuestionReport[];
}

export interface IQuestionReport {
  questionId: string;
  isCorrect: boolean;
}
