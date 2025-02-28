import { Configure } from "../../../../interfaces/Configure/Configure";
import { OnlyAudio } from "./QuestionType/OnlyAudio/OnlyAudio";
import { TextAudioPicture } from "./QuestionType/TextAudioPicture/TextAudioPicture";

interface QuestionSectionProps {
  config: Configure;
  vietnameseText: string | null;
  pictureId: string | null;
  englishText: string | null;
  audioId: string | null;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  config,
  vietnameseText,
  englishText,
  audioId,
  pictureId,
}) => {
  return (
    <div>
      {config.audio &&
      !config.englishText &&
      !config.vietnameseText &&
      !config.image ? (
        <OnlyAudio audioId={audioId!} />
      ) : (
        <TextAudioPicture
          vietnameseText={vietnameseText}
          englishText={englishText}
          pictureId={pictureId}
        />
      )}
    </div>
  );
};

export default QuestionSection;
