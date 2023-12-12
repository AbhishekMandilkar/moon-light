'use client'
import { Button, Result } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";


function NotFound() {
  return (
    <Result
      icon={
        <Image
          alt="404"
          height={400}
          width={400}
          src={"https://notioly.com/wp-content/uploads/2022/01/88.404.png"}
        />
      }
      className="h-screen items-center"
      title="Sorry, the page you visited does not exist."
      extra={<Button href="/" type="primary">Back Home</Button>}
    />
  );
}

export default NotFound;
