"use client";

import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          sizeUnit: 6,
          colorPrimary: "#000000",
          colorInfo: "#000000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
