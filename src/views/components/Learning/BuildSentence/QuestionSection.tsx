import { Configure } from "../../../../interfaces/Configure/Configure";
import { Resource } from "../../../../interfaces/IResource";
import { OnlyAudio } from "../../LearnPage/QuestionType/OnlyAudio/OnlyAudio";
import { TextAudioPicture } from "../../LearnPage/QuestionType/TextAudioPicture/TextAudioPicture";

interface QuestionSectionProps {
  questionConfigure: Configure;
  vietnameseText: string | null;
  picture: Resource | null;
  englishText: string | null;
  audio: Resource | null;
  isBuildSentence?: boolean;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  questionConfigure,
  vietnameseText,
  englishText,
  audio,
  picture,
  isBuildSentence = false,
}) => {
  return (
    <div>
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
          audio={audio}
        />
      )}
    </div>
  );
};

export default QuestionSection;
