export interface IDueReview {
  id: string;
  userId: string;
  questionId: string;
  lastReview: Date;
  nextReview: Date;
  repetitionCount: number;
  easinessFactor: number;
}

export interface IReviewRecordDue {
  dueReviews: IDueReview[];
  nextCursor: Date;
  hasMore: boolean;
}
