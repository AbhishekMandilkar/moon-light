import {
  Clipboard,
  IconProps,
  Message,
  Setting,
  Setting2,
  Profile,
} from "iconsax-react";

export interface ITabs {
  path: string;
  icon: (isActive: boolean, props: IconProps) => JSX.Element;
  name: string;
}

export const getAvailableTabs = () => {
  const tabList: ITabs[] = [];
  tabList.push({
    path: "/chats",
    name: "Chats",
    icon: (isActive: boolean, props: IconProps) => (
      <Message key={"/chats"} {...props} />
    ),
  });
  tabList.push({
    path: "/boards",
    name: "Boards",
    icon: (isActive: boolean, props: IconProps) => (
      <Clipboard key={"/boards"} {...props} />
    ),
  });
  tabList.push({
    path: "/settings",
    name: "Settings",
    icon: (isActive: boolean, props: IconProps) => (
      <Setting2 key={"/settings"} {...props} />
    ),
  });
  tabList.push({
    path: "/profile",
    name: "Profile",
    icon: (isActive: boolean, props: IconProps) => (
      <Profile key={"/profile"} {...props} />
    ),
  });
  return tabList;
};
