/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";
import { Dispatch, useEffect, useState } from "react";
import axios from "axios";
import {
  ICourse,
  ILesson,
  ILessonInformation,
} from "../../../interfaces/Course";

const scrollContainerStyle = css`
  scrollbar-width: 0px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
// React.Dispatch<React.SetStateAction<number>>
const fetchCourse = async (
  setCourse: React.Dispatch<React.SetStateAction<ICourse | null>>
) => {
  await axios
    .get("/api/Course")
    .then((response) => {
      setCourse(response.data);
    })
    .catch((error) => {
      console.error("Error fetching the mock data:", error);
    });
};

const fetchLessonDetail = async (
  courseId: string,
  setLessonsInformation: React.Dispatch<
    React.SetStateAction<ILessonInformation[]>
  >
) => {
  await axios
    .get(`/api/Lesson/${courseId}`)
    .then((response) => {
      setLessonsInformation(response.data.value);
    })
    .catch((error) => {
      console.error("Error while fetching course's lessons:", error);
    });
};

const HomePage: React.FC = () => {
  const [course, setCourse] = useState<ICourse | null>(null);
  const [lessonsInformation, setLessonsInformation] = useState<
    ILessonInformation[]
  >([]);
  useEffect(() => {
    fetchCourse(setCourse);
  }, []);
  useEffect(() => {
    if (course) {
      fetchLessonDetail(course.value[0].id, setLessonsInformation);
    }
  }, [course]);
  return (
    <div
      className="w-full h-full flex justify-between"
      css={scrollContainerStyle}
    >
      <div className="w-3/5 h-full overflow-auto" css={scrollContainerStyle}>
        <DisplayUnit
          title={course?.value[0].name}
          type={1}
          lessonsList={course?.value[0].lessons}
          lessonsInformation={lessonsInformation}
        />
      </div>
      <div className="w-2/5 h-full">
        <div className="w-[95%] h-full flex flex-col">
          <div className="w-ful h-[12%]  flex justify-evenly items-center gap-10 ">
            <img
              src="https://static.wikia.nocookie.net/duolingo/images/5/59/American_flag.png"
              alt="america flag"
              width="40"
            />
            <div className="flex justify-center items-center gap-2">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
                alt="streaking icon"
              />
              <span className="text-[#FFAB32] font-bold">123</span>
            </div>
          </div>
          <div
            className="flex flex-col border-2 border-[#37464f] rounded-2xl gap-4"
            style={{ padding: "25px 25px" }}
          >
            <div className="w-full flex justify-between">
              <span className=" font-bold text-white">Giải đấu Kim Cương</span>
              <span className=" font-bold text-[#50D3FF]">XEM GIẢI ĐẤU</span>
            </div>

            <div className="flex flex-row gap-8">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/afe5c7067cd5fb7de936d3928ea7add6.svg"
                alt="Logo leaderboard"
              />
              <div className="flex flex-col justify-start items-start gap-2">
                <span className="font-bold">Bạn đã đạt vị trí thứ 8</span>
                <span className="font-medium text-[#DCE6EC]">
                  Tuần này bạn đã kiếm được tổng cộng 899 KN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
