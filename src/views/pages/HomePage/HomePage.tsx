/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";
import { Dispatch, useEffect, useState } from "react";
import api from "../../../configs/axiosConfig";
import Streaking from "./StreakComponent/Streaking";
import { ICourse, ILessonInformation } from "../../../interfaces/Course";

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
  await api
    .get("/Course")
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
  await api
    .get(`/Lesson/${courseId}`)
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
      className="w-3/5 h-full flex justify-between"
      css={scrollContainerStyle}
    >
      <div className="w-full h-full overflow-auto" css={scrollContainerStyle}>
        <DisplayUnit
          title={course?.value[0].name}
          type={1}
          lessonsList={course?.value[0].lessons}
          lessonsInformation={lessonsInformation}
        />
      </div>
    </div>
  );
};
export default HomePage;
