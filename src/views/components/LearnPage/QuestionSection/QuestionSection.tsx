import { Configure } from "../../../../interfaces/Configure/Configure";
import { IResource } from "../../../../interfaces/IResource";
import { OnlyAudio } from "../QuestionType/OnlyAudio/OnlyAudio";
import { TextAudioPicture } from "../QuestionType/TextAudioPicture/TextAudioPicture";
import { IWord } from "../../../../interfaces/Questions/IPronunciationQuesion";
import { MutableRefObject } from "react";

interface QuestionSectionProps {
  questionConfigure: Configure;
  vietnameseText: string | null;
  picture: IResource | null;
  englishText: string | null;
  audio: IResource | null;
  isBuildSentence?: boolean;
  words: IWord[];
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  questionConfigure,
  vietnameseText,
  englishText,
  audio,
  picture,
  isBuildSentence = false,
  words,
}) => {
  console.log(words);
  return (
    <div className=" flex justify-center items-center w-full h-full ">
      {questionConfigure.audio &&
      !questionConfigure.englishText &&
      !questionConfigure.vietnameseText &&
      !questionConfigure.image ? (
        <OnlyAudio audio={audio!} />
      ) : (
        <TextAudioPicture
          vietnameseText={vietnameseText}
          englishText={englishText}
          picture={picture}
          isBuildSentence={isBuildSentence}
          audio={audio!}
          words={words}
        />
      )}
    </div>
  );
};

export default QuestionSection;
