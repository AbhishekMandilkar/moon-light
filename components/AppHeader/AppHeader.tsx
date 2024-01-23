import React from "react";
import { UserNav } from "../UserNav/UserNav";
import { GlobalSearch } from "../GlobalSearch/GlobalSearch";

function AppHeader() {
  return (
    <div className="flex justify-end h-16 p-3">
      <GlobalSearch />
      <div className="flex flex-1" />
      <UserNav />
    </div>
  );
}

export default AppHeader;
