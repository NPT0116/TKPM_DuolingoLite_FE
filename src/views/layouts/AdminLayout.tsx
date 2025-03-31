import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import ic_book from "../../assets/icons/ic_book.png";
import ic_color from "../../assets/icons/ic_color.png";
import ic_question_mark from "../../assets/icons/ic_question_mark.png";

const { Header, Content, Sider } = Layout;

const lessonItems: MenuProps["items"] = [
  {
    key: "course",
    icon: (
      <img src={ic_color} alt="icon_course" style={{ width: 30, height: 30 }} />
    ),
    label: "Courses",
  },
  {
    key: "lesson",
    icon: (
      <img src={ic_book} alt="icon lesson" style={{ width: 30, height: 30 }} />
    ),
    label: "Lessons",
  },
  {
    key: "questions",
    icon: (
      <img
        src={ic_question_mark}
        alt="icon lesson"
        style={{ width: 30, height: 30 }}
      />
    ),
    label: "Question",
    children: [
      { key: "multiple", label: "Multiple Choice" },
      { key: "sentence", label: "Build Sentence" },
      { key: "matching", label: "Matching" },
      { key: "pronunciation", label: "Pronunciation" },
    ],
  },
];

const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
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
  return (
    <Layout className="min-h-[100vh] h-[100vh] overflow-y-auto">
      <Header
        className="gap-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          className="h-[50%]"
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
          alt=""
        />
        <h2
          className="text-[20px] text-[white] font-bold"
          style={{
            marginBottom: "2px",
          }}
        >
          DASHBOARD
        </h2>
      </Header>
      <div className="h-[90%]">
        <Layout
          className="h-full"
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width="20%">
            <Menu
              mode="inline"
              defaultSelectedKeys={["multiple"]}
              defaultOpenKeys={["lesson"]}
              style={{
                fontWeight: "500",
                height: "100%",
                fontSize: "20px",
              }}
              items={lessonItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content className="h-full" style={{ padding: "0 24px" }}>
            <Outlet />
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default AdminLayout;
