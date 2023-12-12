"use client";
import SideBar from "@/components/SideBar/SideBar";
import useAuth from "@/contexts/AuthContext";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authData } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ backgroundClip: "white", width: 256 }}
        width={256}
        collapsedWidth={68}
        breakpoint='lg'
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <SideBar
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;
