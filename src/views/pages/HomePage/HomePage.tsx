/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";
import React, { use, useEffect, useState } from "react";
import api from "../../../configs/axiosConfig";
import {
  ICourseValue,
  IUserCourseValue,
  ILessonInformation,
} from "../../../interfaces/Course";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../../../services/Course/GetCourseByIdService";
import { getUserProfile } from "../../../services/Authentication/AuthService";
import { LessonOrderContext } from "../../../context/LessonContext";
import { useCourseContext } from "../../../context/CourseContext";
import StepButton from "../../components/Admin/Components/StepButton";
import { getUserRegisterCourse } from "../../../services/User/GetUserRegisterdCourse";
import { upgradePremium } from "../../../services/Payment/UpgradePremiumService";

const scrollContainerStyle = css`
  scrollbar-width: 0px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const HomePage: React.FC = () => {
  const { switchCourse, registeredCourses, setRegisteredCourses } =
    useCourseContext();

  const fetchLessonDetail = async (
    courseId: string,
    setLessonsInformation: React.Dispatch<
      React.SetStateAction<ILessonInformation[]>
    >
  ) => {
    try {
      const response = await api.get(`/Lesson/${courseId}`);
      if (response.data) {
        setLessonsInformation(response.data.value);
      }
    } catch (error) {
      console.error("Error while fetching course's lessons:", error);
    }
  };
  const fetchUserRegisteredCourse = async () => {
    try {
      const result = await getUserRegisterCourse();
      console.log("SWITCHHHH COURSE NEE", switchCourse);
      const courseId =
        result!.value.length === 0
          ? ""
          : switchCourse
          ? switchCourse!.id
          : result!.value[0].courseId;
      console.log(result);
      console.log("ID NE", courseId);
      if (result) {
        setRegisteredCourses(result.value);
        const courseData = {
          value: courseId
            ? {
                userId: localStorage.getItem("userId"),
                courseId: courseId,
                lessonOrder: result.value!.find(
                  (registeredCourse) => registeredCourse.courseId === courseId
                )?.lessonOrder,
              }
            : null,
        };
        console.log("COURSE DATA", courseData);
        return courseData;
      }
    } catch (error) {
      console.log("Error while fetching user current course: ", error);
    }
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
      // const courseData = await getUserCurrentCourse(userProfiledData.value);
      // Refetch
      console.log("New fetch and Re-Fetch user progress");
      const courseData = await fetchUserRegisteredCourse();
      console.log(courseData);
      setSelectedCourse(courseData.value);
      try {
        const courseDetail = await getCourseById(courseData!.value.courseId);
        setCourseDetail(courseDetail.value);
      } catch (err) {
        console.error("Failed to fetch course detail:", err);
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

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
    if (switchCourse) {
      fetchUserCourse(navigate, setSelectedCourse, setCourseDetail);
    }
  }, [switchCourse, navigate]);

  useEffect(() => {
    const upgradeData = localStorage.getItem("upgradeAfterPayment");
    if (upgradeData) {
      const { month, money } = JSON.parse(upgradeData);
      upgradePremium(month, money)
        .then(() => {
          console.log("Upgrade Premium thành công sau khi thanh toán");
          // Dispatch event to notify right side bar
          window.dispatchEvent(new Event("premiumUpgraded"));
        })
        .catch((err) => {
          console.error("Upgrade Premium lỗi:", err);
        })
        .finally(() => {
          localStorage.removeItem("upgradeAfterPayment");
        });
    }
  }, []);

  useEffect(() => {
    if (selectedCourse?.courseId) {
      fetchLessonDetail(selectedCourse.courseId, setLessonsInformation);
    }
  }, [selectedCourse]);

  useEffect(() => {
    console.log("a");
    console.log(lessonsInformation.length);
  }, []);

  return (
    <div
      className="flex h-full justify-between w-3/5"
      css={scrollContainerStyle}
    >
      <div
        className="h-full w-full overflow-auto"
        css={scrollContainerStyle}
        style={{ marginTop: "7%" }}
      >
        <LessonOrderContext.Provider value={selectedCourse?.lessonOrder ?? 0}>
          {selectedCourse ? (
            <DisplayUnit
              onClick={() => {
                localStorage.setItem(
                  "prevLessonOrder",
                  JSON.stringify(selectedCourse?.lessonOrder ?? 0)
                );
                localStorage.setItem(
                  "lessonLength",
                  JSON.stringify(lessonsInformation.length)
                );
              }}
              setShowToast={setShowToast}
              courseId={selectedCourse?.courseId}
              title={courseDetail?.name}
              type={1}
              lessonsList={selectedCourse?.lessons}
              lessonsInformation={lessonsInformation}
            />
          ) : (
            <div className="w-full h-full  flex justify-center items-center font-bold">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/7f2dfc9cc806971c2230c8f91b5b8bdd.svg"
                alt=""
              />
              <div
                className="w-full flex flex-col gap-2"
                style={{ margin: "10px" }}
              >
                <span
                  className="h-2/3 border-2 rounded-xl border-[#37464F]  text-lg"
                  style={{ padding: "20px" }}
                >
                  Bạn chưa đăng ký khóa học nào, hãy đăng ký một khóa học !
                </span>
                <div className="h-[80px]">
                  <StepButton
                    content="Đăng ký"
                    onClick={() => {
                      navigate("/courses");
                    }}
                  />
                </div>
              </div>
            </div>
          )}
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
