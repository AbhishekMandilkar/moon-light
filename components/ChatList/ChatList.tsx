"use client";
import React, { useEffect, useState } from "react";
import HStack from "../Common/Stacks/HStack";
import VStack from "../Common/Stacks/VStack";
import { Avatar, Input, List, Skeleton, Typography } from "antd";
import { SearchNormal1 } from "iconsax-react";
import { SearchOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
function ChatList() {
  const data = [
    {
      title: "User 1",
    },
    {
      title: "User 2",
    },
    {
      title: "User 3",
    },
    {
      title: "User 4",
    },
  ];

  return (
    <VStack classNames="bg-white w-1/4 rounded-lg p-4 self-stretch">
      <header className="mb-2 w-full">
        <HStack classNames="items-center">
          <Input
            placeholder="Search your chats"
            size="large"
            suffix={<SearchOutlined />}
            height={50}
          />
        </HStack>
      </header>
      <List
        split={false}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <HStack classNames="flex-1 py-2 mb-2 rounded-lg hover:bg-gray-100 items-center">
            <Skeleton.Avatar size={36} active />
            <Typography className="ml-2">{item.title}</Typography>
          </HStack>
        )}
      />
    </VStack>
  );
}

export default ChatList;
