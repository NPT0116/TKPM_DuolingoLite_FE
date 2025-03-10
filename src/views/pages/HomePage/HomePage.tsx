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
    <div className="w-3/5 h-full overflow-auto" css={scrollContainerStyle}>
      <DisplayUnit
        title={course?.value[0].name}
        type={1}
        lessonsList={course?.value[0].lessons}
        lessonsInformation={lessonsInformation}
      />
    </div>
  );
};
export default HomePage;
