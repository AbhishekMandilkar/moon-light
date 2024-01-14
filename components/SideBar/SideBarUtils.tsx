import {
  FolderOpenDot,
  Goal,
  ListChecks,
  LucideProps,
} from "lucide-react";

export interface ITabs {
  path: string;
  icon: (isActive?: boolean, props?: LucideProps) => JSX.Element;
  name: string;
}

export const getAvailableTabs = () => {
  const tabList: ITabs[] = [];
  tabList.push({
    path: "/todo",
    name: "Todo",
    icon: (isActive, props) => <ListChecks {...props} />,
  });
  tabList.push({
    path: "/goals",
    name: "Goals",
    icon: (isActive, props) => <Goal {...props} />,
  });
  tabList.push({
    path: "/projects",
    name: "Projects",
    icon: (isActive, props) => <FolderOpenDot {...props} />,
  });
  // tabList.push({
  //   path: "/profile",
  //   name: "Profile",
  //   icon: (isActive, props) => <User {...props} />,
  // });
  return tabList;
};
