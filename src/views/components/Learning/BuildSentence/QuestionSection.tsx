import { Configure } from "../../../../interfaces/Configure/Configure";
import { Resource } from "../../../../interfaces/Resource";
import { OnlyAudio } from "../../LearnPage/QuestionType/OnlyAudio/OnlyAudio";
import { TextAudioPicture } from "../../LearnPage/QuestionType/TextAudioPicture/TextAudioPicture";

interface QuestionSectionProps {
  questionConfigure: Configure;
  vietnameseText: string | null;
  pictureId: string | null;
  englishText: string | null;
  audio: Resource | null;
  isBuildSentence?: boolean;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  questionConfigure,
  vietnameseText,
  englishText,
  audio,
  pictureId,
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
          pictureId={pictureId}
          isBuildSentence={isBuildSentence}
          audio={audio}
        />
      )}
    </div>
  );
};

export default QuestionSection;
