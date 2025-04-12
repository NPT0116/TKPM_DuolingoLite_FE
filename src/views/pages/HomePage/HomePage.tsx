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
import { LessonOrderContext } from "../../../context/LessonContext";
import { getUserRanking } from "../../../services/LeaderBoard/GetUserRanking";

const scrollContainerStyle = css`
  scrollbar-width: 0px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

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
    console.log("Fetch course in home page");
    console.log(courseData);
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
  const [showToast, setShowToast] = useState(false);
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
        <LessonOrderContext.Provider value={selectedCourse?.lessonOrder ?? 0}>
          <DisplayUnit
            setShowToast={setShowToast}
            courseId={selectedCourse?.courseId}
            title={courseDetail?.name}
            type={1}
            lessonsList={selectedCourse?.lessons}
            lessonsInformation={lessonsInformation}
          />
        </LessonOrderContext.Provider>
      </div>
      {showToast && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/20 backdrop-blur-none flex justify-center items-center ">
          <div
            className="bg-[#131F24] text-white font-bold p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 w-full sm:w-[70%] md:w-[400px] text-center relative"
            style={{ padding: "30px" }}
          >
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowToast(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[25px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/48d11e733b7b84a998e06460930feed7.svg"
              alt=""
            />
            <h2
              className="text-[25px] font-bold"
              style={{ marginBottom: "20px" }}
            >
              Bạn đã hết tim. Hãy nghỉ ngơi và quay lại sau nhé!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
