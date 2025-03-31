import React from "react";
import {
  BookOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Sider } = Layout;

// const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items2: MenuProps["items"] = [
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

const AdminHomePage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-[100vh] min-h-[100vh]">
      <Header
        className="gap-[70px]"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          className="h-[50%]"
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
          alt=""
        />
        <h2
          className="text-[15px] text-[#58CC02] font-bold"
          style={{
            marginBottom: "2px",
          }}
        >
          DASHBOARD
        </h2>
      </Header>
      <div className="h-[80%]" style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
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
              items={items2}
            />
          </Sider>
          <Content className="h-full" style={{ padding: "0 24px" }}>
            Content
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default AdminHomePage;
