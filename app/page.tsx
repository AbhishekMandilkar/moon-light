"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ID, account } from "@/services/appwrite";
import { isAuthenticated } from "@/lib/utils/isAuthenticated";
import LoginSignUp from "@/components/login-sign-up/LoginSignUp";

const Page = () => {
  const router = useRouter();
  router.replace('/todo')
  return <></>;
};

export default Page;
