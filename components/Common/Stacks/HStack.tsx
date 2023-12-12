'use client'
import React from 'react';

interface HStackProps {
  children?: React.ReactNode;
  classNames?: string;
}

const HStack: React.FC<HStackProps> = ({ children, classNames }) => {
  return (
    <div className={`flex ${classNames}`}>
      {children}
    </div>
  );
};

export default HStack;
