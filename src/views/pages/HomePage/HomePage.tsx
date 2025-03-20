/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import api from "../../../configs/axiosConfig";
import {
  ICourseValue,
  IUserCourseValue,
  ILessonInformation,
} from "../../../interfaces/Course";
import { useNavigate } from "react-router-dom";
import { getUserCurrentCourse } from "../../../services/Course/GetUserCourseService";
import { getCourseById } from "../../../services/Course/GetCourseByIdService";
import { getUserProfile } from "../../../services/Authentication/AuthService";

const scrollContainerStyle = css`
  scrollbar-width: 0px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
// React.Dispatch<React.SetStateAction<number>>;
// const fetchCourse = async (
//   setCourse: React.Dispatch<React.SetStateAction<ICourse | null>>
// ) => {
//   await api
//     .get("/Course")
//     .then((response) => {
//       setCourse(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching the mock data:", error);
//     });
// };

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

// Lấy course hiện tại của user và course detail của course đó
const fetchUserCourse = async (
  navigate: ReturnType<typeof useNavigate>,
  setSelectedCourse: React.Dispatch<
    React.SetStateAction<IUserCourseValue | null>
  >,
  setCourseDetail: React.Dispatch<React.SetStateAction<ICourseValue | null>>
) => {
  try {
    const userProfiledData = await getUserProfile();
    if (!userProfiledData) {
      navigate("/login");
    }

    const courseData = await getUserCurrentCourse(userProfiledData.value);
    if (courseData === null) {
      navigate("/courses");
    } else if (courseData.value) {
      setSelectedCourse(courseData.value);
      try {
        const courseDetail = await getCourseById(courseData.value.courseId);
        setCourseDetail(courseDetail.value);
      } catch (err) {
        console.error("Failed to fetch course detail:", err);
      }
    }
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
  }
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<IUserCourseValue | null>(
    null
  );
  const [courseDetail, setCourseDetail] = useState<ICourseValue | null>(null);
  const [lessonsInformation, setLessonsInformation] = useState<
    ILessonInformation[]
  >([]);

  useEffect(() => {
    fetchUserCourse(navigate, setSelectedCourse, setCourseDetail);
  }, [navigate]);

  useEffect(() => {
    if (selectedCourse?.courseId) {
      console.log(selectedCourse.courseId);
      fetchLessonDetail(selectedCourse.courseId, setLessonsInformation);
      console.log("length", lessonsInformation.length);
    }
  }, [selectedCourse]);

  return (
    <div
      className="flex h-full justify-between w-3/5"
      css={scrollContainerStyle}
    >
      <div className="h-full w-full overflow-auto" css={scrollContainerStyle}>
        <DisplayUnit
          courseId={selectedCourse?.courseId}
          title={courseDetail?.name}
          type={1}
          lessonsList={selectedCourse?.lessons}
          lessonsInformation={lessonsInformation}
          lessonOrder={selectedCourse?.lessonOrder || 0}
        />
      </div>
    </div>
  );
};
export default HomePage;
