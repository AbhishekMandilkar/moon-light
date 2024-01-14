"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import appwriteService from "@/services/appwrite";
import useAuth, { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { UserAuthForm } from "./components/UserAuthForm";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ThemeToggle from "../Common/ThemeToggle";
import BrandLogo from "../Common/BrandLogo";
const LoginSignUp: React.FC = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [componentState, setComponentState] = useState<{
    showRegister: boolean;
    loading: boolean;
  }>({
    showRegister: false,
    loading: false,
  });
  const imageSize = 350;

  const login = async (data: { email: string; password: string }) => {
    setComponentState((prev) => ({ ...prev, loading: true }));
    try {
      const session = await appwriteService.login(data);
      if (session) {
        const data = await appwriteService.isLoggedIn();
        authContext.setAuthData(data);
        setComponentState((prev) => ({ ...prev, loading: false }));
        router.push("/");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
      setComponentState((prev) => ({ ...prev, loading: false }));
      // notification.error({
      //   message: "Invalid login",
      // });
    }
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    setComponentState((prev) => ({ ...prev, loading: true }));
    try {
      const userData = await appwriteService.createUserAccount({
        name: data.username,
        email: data.email,
        password: data.password,
      });
      if (userData) {
        const data = await appwriteService.isLoggedIn();
        authContext.setAuthData(data);
        setComponentState((prev) => ({ ...prev, loading: false }));
        router.push("/home");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
      setComponentState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <>
      <div className="container relative h-screen flex flex-col items-center justify-center transition-all ease-in duration-200">
        <span className="absolute left-4 top-4 md:left-8 md:top-8">
          <BrandLogo />
          {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}
        </span>
        <span className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center">
          <Button
            className="mr-4"
            onClick={() =>
              setComponentState((prev) => ({
                ...prev,
                showRegister: !prev.showRegister,
              }))
            }
          >
            {componentState.showRegister ? "Login" : "Register"}
          </Button>
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
                {componentState.showRegister
                  ? "Create an account"
                  : "Welcome back"}
              </motion.h1>
              <p className="text-sm text-muted-foreground">
                {componentState.showRegister
                  ? " Enter your email below to create your account"
                  : "Enter your credentials below to login"}
              </p>
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

export default LoginSignUp;
