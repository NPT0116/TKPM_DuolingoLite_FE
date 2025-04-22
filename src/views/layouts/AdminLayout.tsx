import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ic_flag from "../../assets/icons/ic_flag.svg";
import ic_courses from "../../assets/icons/ic_courses.svg";
import ic_add from "../../assets/icons/ic_add.svg";

const lessonItems = [
  // {
  //   key: "lesson",
  //   icon: (
  //     <img
  //       src={ic_flag}
  //       alt="icon lesson"
  //       className="object-cover"
  //       style={{ width: 20, height: 16.09, objectPosition: "0 0" }}
  //     />
  //   ),
  //   label: "Lessons",
  //   children: [{ key: "Lessons", label: "Lessons" }],
  // },
  {
    key: "course",
    icon: (
      <img
        src={ic_courses}
        alt="icon course"
        style={{ width: 20, height: 20 }}
      />
    ),
    label: "Courses",
    children: [{ key: "Courses", label: "Courses" }],
  },
  // {
  //   key: "",
  //   icon: (
  //     <img src={ic_add} alt="icon question" style={{ width: 20, height: 20 }} />
  //   ),
  //   label: "Question",
  //   children: [
  //     { key: "multiple", label: "Multiple Choice" },
  //     { key: "sentence", label: "Build Sentence" },
  //     { key: "matching", label: "Matching" },
  //     { key: "pronunciation", label: "Pronunciation" },
  //   ],
  // },
];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // Track expanded state for parent items with children
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    const routeMap: Record<string, string> = {
      course: "/admin/course",
      questions: "/admin/question",
      multiple: "/admin/lesson/multiple-choice",
      sentence: "/admin/lesson/build-sentence",
      matching: "/admin/lesson/matching",
      pronunciation: "/admin/lesson/pronunciation",
    };

    if (routeMap[key]) {
      navigate(routeMap[key]);
    }
  };

  const toggleExpand = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-[10vh] flex items-center gap-4 bg-[#F7F7F7]  text-white px-4 border-b-2 border-[#E5E5E5]">
        <img
          className="h-1/2 translate-x-[50px]"
          src="//schools-cdn.duolingo.com/images/a927ec366552d177acc8f3fb4f353337.svg"
          alt="logo"
        />
      </header>

      {/* Body */}
      <div className="flex h-[90vh]">
        {/* Custom Sidebar */}
        <aside
          className={`bg-[#F7F7F7] border-r-2 border-[#E5E5E5] transition-all duration-300 ${
            collapsed ? "w-16" : "w-50"
          } relative`}
        >
          <div className="flex flex-col p-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{ padding: "0px", margin: "0px" }}
              className="bg-white rounded-full w-[30px] h-[30px] border-[#E5E5E5] border-2 flex justify-center items-center text-xl font-bold text-[#AFAFAF] absolute right-0 translate-x-[15px] translate-y-[15px] z-10"
            >
              {collapsed ? (
                <img
                  width={8}
                  src="https://schools-cdn.duolingo.com/images/18e73dd7d50fbe48b1a0e41f33635b88.svg"
                  alt="ic_back"
                  style={{ transform: "scale(-1)" }}
                />
              ) : (
                <img
                  width={8}
                  src="https://schools-cdn.duolingo.com/images/18e73dd7d50fbe48b1a0e41f33635b88.svg"
                  alt="ic_back"
                />
              )}
            </button>

            <ul className="flex flex-col " style={{ margin: "40px 0" }}>
              {lessonItems.map((item) => (
                <React.Fragment key={item.key}>
                  <li
                    onClick={
                      item.key
                        ? () => handleMenuClick(item.key)
                        : (e) => toggleExpand(item.key, e)
                    }
                    className="group relative text-[#AFAFAF] flex items-center gap-2 cursor-pointer hover:bg-[#DDF4FF] hover:text-[#1999D6]"
                    style={{ padding: "10px 5px" }}
                  >
                    {/* Icon Container with fixed size */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    {/* Show label only when not collapsed */}
                    {!collapsed && (
                      <span className="font-medium text-lg">{item.label}</span>
                    )}
                    {/* Toggle button for children (only in expanded mode and if children exist) */}
                    {!collapsed &&
                      item.children &&
                      item.children.length > 1 && (
                        <button
                          onClick={(e) => toggleExpand(item.key, e)}
                          className="ml-auto text-xl font-bold text-[#AFAFAF] group-hover:text-[#1999D6]"
                        >
                          {expanded[item.key] ? "–" : "+"}
                        </button>
                      )}
                    {/* When collapsed and item has children, show popup on hover */}
                    {collapsed && item.children && (
                      <div className="absolute left-full hidden group-hover:block bg-white shadow-xl rounded w-[200px]">
                        <ul>
                          {item.children.map((child) => (
                            <li
                              key={child.key}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuClick(child.key);
                              }}
                              className="p-1 hover:bg-gray-100 cursor-pointer font-medium"
                              style={{ padding: "10px 20px" }}
                            >
                              {child.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                  {/* In expanded mode, if this item has children and is toggled open, show them */}
                  {!collapsed && item.children && expanded[item.key] && (
                    <ul className="flex flex-col gap-1">
                      {item.children.map((child) => (
                        <li
                          key={child.key}
                          onClick={() => handleMenuClick(child.key)}
                          className="cursor-pointer p-1 hover:bg-[#DDF4FF] hover:text-[#1999D6] rounded text-[#AFAFAF]"
                          style={{ padding: "8px 20px" }}
                        >
                          {child.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
