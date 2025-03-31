import React from "react";
import {
  BookOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const lessonItems: MenuProps["items"] = [
  {
    key: "course",
    icon: React.createElement(BookOutlined),
    label: "Courses",
  },
  {
    key: "lesson",
    icon: React.createElement(ReadOutlined),
    label: "Lessons",
    children: [
      { key: "multiple", label: "Multiple Choice" },
      { key: "sentence", label: "Build Sentence" },
      { key: "matching", label: "Matching" },
      { key: "pronunciation", label: "Pronunciation" },
    ],
  },
  {
    key: "questions",
    icon: React.createElement(QuestionCircleOutlined),
    label: "Question",
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
    <Layout className="h-[100vh] min-h-[100vh]">
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
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["multiple"]}
              defaultOpenKeys={["lesson"]}
              style={{ height: "100%" }}
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
