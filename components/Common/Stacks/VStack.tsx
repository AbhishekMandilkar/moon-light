'use client'
import React from 'react';

interface VStackProps {
  children?: React.ReactNode;
  classNames?: string;
}

const VStack: React.FC<VStackProps> = ({ children, classNames }) => {
  return (
    <div className={`flex flex-col ${classNames}`}>
      {children}
    </div>
  );
};

export default VStack;
