"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

interface UserAuthFormProps {
  isLoading: boolean;
  login: (data: { email: string; password: string }) => void;
  registerUser: (data: {
    email: string;
    password: string;
    username: string;
  }) => void;
  isRegister?: boolean;
}

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .or(
    z.object({
      email: z.string().email({
        message: "Please enter a valid email.",
      }),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
    })
  );

export function UserAuthForm({...props }: UserAuthFormProps) {
  const { isLoading, login, registerUser, isRegister } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "abhi@gmail.com",
      password: "asdf1234",
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    if (isRegister) {
      registerUser(data as {
        email: string;
        password: string;
        username: string;
      });
    } else {
      login(data);
    }
  }

  return (
    <div className={cn("grid gap-6")} {...props}>
      <AnimatePresence>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} id="form">
            <div className="grid gap-2">
              <div className="grid gap-1">
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0,y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@gmail.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" size={16} />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </Form>
      </AnimatePresence>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" size={16} />}{" "}
        GitHub
      </Button>
    </div>
  );
}
