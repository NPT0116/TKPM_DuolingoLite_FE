import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { ICourseValue } from "../../../interfaces/Course";
import { Link, useNavigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import { GetCourseListService } from "../../../services/Course/GetCourseListService";
import { registerCourseService } from "../../../services/Course/RegisterCourseService";

const ChooseCoursePage: React.FC = () => {
  const [courses, setCourses] = useState<ICourseValue[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList = await GetCourseListService();
        setCourses(courseList.value);
      } catch (err) {
        console.log("Failed to fetch course list: " + err);
      }
    };

    fetchCourses();
  });

  const duoSpeech = "Hãy chọn khoá học để tiếp tục chặng đường nào!";
  const duoWordsSpeech = duoSpeech.split(" ");
  const characterArray = [
    "https://design.duolingo.com/52ba0a30df9d8346a1d7.svg",
    "https://design.duolingo.com/47cea17496b4500c170e.svg",
    "https://design.duolingo.com/4a0a10a8a660d11fe5af.svg",
    "https://design.duolingo.com/6ae0baeaa1d7dd4ccf6a.svg",
    "https://design.duolingo.com/3759efd081011423baf6.svg",
  ];
  const characterColors = [
    "#FDB02A",
    "#CC348D",
    "#2BE69C",
    "#2FE3FF",
    "#FF4B4B",
  ];

  return (
    <div className="w-full h-[100vh] overflow-auto flex flex-col  text-white font-bold">
      {/* Duolingo Introduce */}
      <div className="flex gap-4" style={{ margin: "20px 100px" }}>
        <img
          src="https://design.duolingo.com/f432eb8c3e03de216d20.svg"
          alt="duoicon"
          className="w-[140px] h-auto"
        />
        <div
          className="relative border-2 border-[#37464f] h-fit rounded-2xl p-4"
          style={{ padding: "20px" }}
        >
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/d19d8e1b8c087398958b9475ee6101cb.svg"
            alt="chat box tail"
            className="absolute bottom-[10px] left-[-20px]"
          />
          <span className="flex gap-1">
            {duoWordsSpeech.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[80%] flex flex-col">
          {/* Course Card Grid */}
          <div className="w-full flex justify-center ">
            <div
              className="flex lg:flex-cols-5 md:flex-cols-3 flex-wrap justify-around gap-5 mt-10 w-full"
              style={{ margin: "100px auto" }}
            >
              {courses.map((course, index) => (
                // Course Card
                <div
                  key={index}
                  className={`flex flex-col border-2  relative ${
                    selectedIndex === index
                      ? "border-[#3F85A7] text-[#3F85A7] "
                      : "border-[#37464f]"
                  } rounded-2xl w-[20%] min-w-[280px] cursor-pointer hover:bg-[#202F36] active:translate-y-2`}
                  onClick={() => setSelectedIndex(index)}
                  style={{
                    boxShadow:
                      selectedIndex === index
                        ? "0 4px 0 0 #3F85A7"
                        : "0 4px 0 0 #37464F",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow =
                      selectedIndex === index
                        ? "0 0 0 0 #3F85A7"
                        : "0 0 0 0 #37464F";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow =
                      selectedIndex === index
                        ? "0 4px 0 0 #3F85A7"
                        : "0 4px 0 0 #37464F";
                  }}
                >
                  <div
                    className={`rounded-t-xl  ${
                      selectedIndex === index ? "border-2 border-[#3F85A7]" : ""
                    }  p-4 text-center text-white text-[20px] flex items-center justify-center`}
                    style={{
                      backgroundColor: characterColors[index],
                      padding: "10px",
                    }}
                  >
                    <span>{course.name}</span>
                  </div>
                  <div
                    className="flex items-center justify-center gap-4 p-4"
                    style={{ padding: "20px 0" }}
                  >
                    <img
                      src={characterArray[index]}
                      alt=""
                      className="h-[200px] w-auto"
                    />
                    <span>Level: {course.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="border-t-2 border-[#37464f] w-full flex justify-end p-5">
        <button
          className={`font-[500] border-2 rounded-2xl text-[25px] transition-all duration-150 ${
            selectedIndex !== null
              ? "border-[#3F85A7] text-[#3F85A7] cursor-pointer hover:bg-[#202F36]"
              : "border-[#37464f] cursor-not-allowed opacity-50"
          }`}
          style={{ padding: "10px 40px", marginRight: "20px" }}
          disabled={selectedIndex === null}
          onClick={() => {
            if (selectedIndex !== null) {
              registerCourseService(courses[selectedIndex].id);
              navigate("/home");
            }
          }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default ChooseCoursePage;
