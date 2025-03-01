import { Configure } from "../../../../interfaces/Configure/Configure";
import { IResource } from "../../../../interfaces/IResource";
import { OnlyAudio } from "../QuestionType/OnlyAudio/OnlyAudio";
import { TextAudioPicture } from "../QuestionType/TextAudioPicture/TextAudioPicture";

interface QuestionSectionProps {
  questionConfigure: Configure;
  vietnameseText: string | null;
  picture: IResource | null;
  englishText: string | null;
  audio: IResource | null;
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
