"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.replace('/tasks')
  return <></>;
};

export default Page;
