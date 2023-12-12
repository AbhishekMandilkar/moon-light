"use client";
import React, { useContext, useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Space, notification } from "antd";
import Image from "next/image";
import appwriteService from "@/services/appwrite";
import useAuth, { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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
    try {
      const session = await appwriteService.login(data);
      if (session) {
        const data = await appwriteService.isLoggedIn();
        authContext.setAuthData(data);
        setComponentState((prev) => ({ ...prev, loading: false }));
        router.push("/home");
      }
    } catch (error: any) {
      setComponentState((prev) => ({ ...prev, loading: false }));
      notification.error({
        message: "Invalid login",
      });
    }
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
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
      setComponentState((prev) => ({ ...prev, loading: false }));
      notification.error({
        message: "Something went wrong",
      });
    }
  };

  const onFinish = (values: any) => {
    setComponentState((prev) => ({ ...prev, loading: true }));
    if (componentState.showRegister) {
      registerUser(values);
    } else {
      login(values);
    }
  };

  return (
    <Flex
      style={{ margin: "0px auto", height: "100vh" }}
      justify="center"
      align="center"
      vertical
    >
      <Image
        src={"https://notioly.com/wp-content/uploads/2022/01/79.Login_.png"}
        width={imageSize}
        height={imageSize}
        alt="moon-light"
      />
      <Form
        style={{
          width: "18%",
        }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {componentState.showRegister && (
          <Form.Item
            name="username"
            rules={[
              {
                required: componentState.showRegister,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
              pattern: new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your Password!" }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            className="w-full"
            htmlType="submit"
          >
            {componentState.showRegister ? "Sign up" : "Log in"}
          </Button>
        </Form.Item>
      </Form>
      <Flex vertical>
        <Button
          size="large"
          type="text"
          onClick={() =>
            setComponentState((prev) => ({ ...prev, showRegister: true }))
          }
        >
          {componentState.showRegister ? "Already a user?" : "New user?"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginSignUp;
