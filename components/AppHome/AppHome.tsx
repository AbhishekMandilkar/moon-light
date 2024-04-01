"use client";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { UserAuthForm } from "../LoginSignUp/components/UserAuthForm";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ThemeToggle from "../Common/ThemeToggle";
import BrandLogo from "../Common/BrandLogo";
import { useSignUp } from "@clerk/nextjs";


const AppHome: React.FC = () => {
  const router = useRouter();
  const [componentState, setComponentState] = useState<{
    showRegister: boolean;
    loading: boolean;
  }>({
    showRegister: false,
    loading: false,
  });
  // const { isLoaded, signUp, setActive } = useSignUp();
  const imageSize = 350;

  const login = async (data: { email: string; password: string }) => {
    router.replace("/app/tasks");
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {};

  return (
    <>
      <div className="container relative h-screen flex flex-col items-center justify-center transition-all ease-in duration-200">
        <span className="absolute left-4 top-8 md:left-8 md:top-8">
          <BrandLogo />
        </span>
        <span className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center">
          <ThemeToggle />
        </span>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <motion.h1
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { ease: "linear" },
                  layout: { duration: 0.3 },
                }}
                key={componentState.showRegister ? "register" : "login"}
                className="text-2xl font-semibold tracking-tight"
              >
                {"Welcome"}
              </motion.h1>
            </div>
            <UserAuthForm
              isLoading={componentState.loading}
              login={login}
              registerUser={registerUser}
              isRegister={componentState.showRegister}
            />
            <p className="px-8 text-center text-sm text-muted-foreground">
              {`Copyright ${
                new Date().getFullYear() + " "
              } © All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHome;
