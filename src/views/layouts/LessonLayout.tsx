import { useEffect, useState } from "react";
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import { useLocation } from "react-router-dom";
import axios from "axios";
import mockData from "../../services/mock_datas/build_sentences.json";
import { IQuestionResponse, IQuestion } from "../../interfaces/IQuestion";
import MultipleChoicePage from "../pages/LearnPage/MultipleChoice/MultipleChoicePage";
import BuildSentencePage from "../pages/LearnPage/BuildSentencePage/BuildSentencePage";
import { IBuildSentenceQuestion } from "../../interfaces/Questions/IBuildSentenceQuestion";
const LessonLayout: React.FC = () => {
  const data = mockData.value as IBuildSentenceQuestion;
  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [quesionList, setQuestionList] = useState<IQuestion[]>([]);
  const location = useLocation();
  const { id } = location.state || {};
  const fetchLesson = async () => {
    for (let i = 0; i < 7; i++) {
      await axios
        .get(
          `/api/Question/questions/list-questions/${id}?questionOrder=${i + 1}`
        )
        .then((response) => {
          setQuestionList((prev) => [...prev, response.data.value]);
        })
        .catch((error) => {
          console.error("Error while fetching question:", error);
        });
    }
  };
  console.log(quesionList);
  useEffect(() => {
    fetchLesson();
  }, [id]);
  useEffect(() => {
    setIsButtonActive(false);
  }, [state]);

  return (
    <div>
      {/* XP Bar */}
      <div className="w-[100vw] h-[10vh] ">
        <XPBar accumulated={xp.accumulated} total={xp.total} />
      </div>
      {/* Main Layout */}
      <div className="w-[100vw] h-[75vh]">
        <BuildSentencePage
          data={data}
          setXp={setXp}
          setIsButtonActive={setIsButtonActive}
          state={state}
        />
        {/* {" "}
        {state == 1 && <MultipleChoicePage />}
        {state == 2 && <div className="text-white">hihi</div>}
        {state == 3 && <div className="text-white">hoho</div>}
        {state == 4 && <MultipleChoicePage />} */}
      </div>

      {/* Navigation Bar */}
      <div
        className="w-[100vw] h-[15vh] border-[#37464F] border-t-2 bg-[#131F23]"
        style={{ padding: "10px 0px" }}
      >
        <ContinueButton
          state={state}
          setState={setState}
          isButtonActivate={isButtonActivate}
          mainColor="3B4EFF"
          borderColor="3F22EC"
          hoverColor="4156FF"
          paddingWidth={80}
          positionRight={250}
        />
      </div>
    </div>
  );
};
export default LessonLayout;
