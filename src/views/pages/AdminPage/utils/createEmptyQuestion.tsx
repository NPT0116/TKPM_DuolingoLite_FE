import { IAddQuestion } from "../../../../interfaces/Questions/IBaseQuestion";

export const createEmptyQuestion = (): IAddQuestion => ({
  instruction: "",
  vietnameseText: null,
  englishText: "",
  sentence: "",
  image: null,
  audio: null,
  order: 1,
  type: 0, //QuestionType 0 = Matching, 1 = MultipleChoice, 2 = BuildSentence, 3 = Pronunciation
  questionConfiguration: {
    audio: false,
    englishText: false,
    vietnameseText: false,
    instruction: false,
    image: false,
  },
  optionConfiguration: {
    audio: false,
    englishText: false,
    vietnameseText: false,
    instruction: false,
    image: false,
  },
  options: [],
});
