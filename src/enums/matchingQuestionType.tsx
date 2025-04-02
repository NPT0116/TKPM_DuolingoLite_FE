export enum MatchingQuestionOptionType {
  Image,
  Audio,
  EnglishText,
  VietnameseText,
}

export const optionDictionary: Record<MatchingQuestionOptionType, string> = {
  [MatchingQuestionOptionType.Image]: "Image",
  [MatchingQuestionOptionType.Audio]: "Audio",
  [MatchingQuestionOptionType.EnglishText]: "English",
  [MatchingQuestionOptionType.VietnameseText]: "Vietnamese",
};
