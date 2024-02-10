import React from "react";
import { UserNav } from "../UserNav/UserNav";
import { GlobalSearch } from "../GlobalSearch/GlobalSearch";
import BrandLogo from "../Common/BrandLogo";
import { UserButton } from "@clerk/nextjs";

function AppHeader() {
  return (
    <div className="flex justify-end h-16 p-3">
      <BrandLogo />
      <div className="flex flex-1" />
      <UserNav />
    </div>
  );
}

export default AppHeader;
