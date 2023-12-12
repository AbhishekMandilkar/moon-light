import { AuthContext } from "@/contexts/AuthContext";
import { Avatar } from "antd";
import { More } from "iconsax-react";
import React, { FC, useContext } from "react";

const Profile: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { authData } = useContext(AuthContext);
  const avatarInitials = authData?.name?.charAt(0);
  return (
    <div className="flex mx-2 rounded-md bg-gray-100 p-2">
      <Avatar>{avatarInitials}</Avatar>
      {!collapsed && (
        <div className="flex flex-col ml-2">
          <span className="text-gray-700">{authData?.name}</span>
          <span className="text-gray-500 text-xs">{authData?.email}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Profile);
