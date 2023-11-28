"use client";
import { ID, account } from "@/services/appwrite";
import { Button, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setShowRegister] = useState<boolean>(false);
  const naigate = useRouter();

  const login = async (email: string, password: string) => {
    const session = await account.createEmailSession(email, password);
    // setLoggedInUser(await account.get());
    naigate.replace("/home");
  };

  const signUp = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };
  const imageSize = 300;
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <Image
        src={"https://notioly.com/wp-content/uploads/2022/01/79.Login_.png"}
        width={imageSize}
        height={imageSize}
        alt="moon-light"
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {register ? "Sign up" : "Sign in to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm items-center">
        <form className="space-y-6" action="#" method="POST">
          <div className="mb-1 flex flex-col gap-6">
            {register && (
              <>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  onChange={e => setName(e.target.value)}
                  size="lg"
                  placeholder="John doe"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
              </>
            )}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              onChange={e => setEmail(e.target.value)}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              onChange={e => setPassword(e.target.value)}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
            />
          </div>
          <Button
            className="w-full"
            variant="gradient"
            onClick={() => {
              if (register) {
                signUp();
              } else {
                login(email, password);
              }
            }}
          >
            {register ? "Register" : "Login"}
          </Button>
          <Button
            onClick={() => setShowRegister(!register)}
            className="w-full"
            variant="text"
          >
            {register ? "Already a user?" : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
