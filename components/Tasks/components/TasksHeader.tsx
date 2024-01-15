import { motion } from 'framer-motion';
import React from 'react'

function TaskHeader() {
    
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      
      className="flex items-center justify-between space-y-2"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for today.
        </p>
      </div>
      <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
    </motion.div>
  );
}

export default TaskHeader