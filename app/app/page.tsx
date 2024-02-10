"use client";
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
  const {isSignedIn} = useAuth()
  const router = useRouter()

  if (!isSignedIn) {
    router.push('/app')
  } else {
    router.push('/app/tasks')
  }
  return (
    <></>
  )
}

export default Page