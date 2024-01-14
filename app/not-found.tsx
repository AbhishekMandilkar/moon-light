'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";


function NotFound() {
  return (
    <Button asChild >
      <Link href="/">Back Home</Link>
    </Button>
  );
}

export default NotFound;
