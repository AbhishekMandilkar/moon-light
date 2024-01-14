import { fontMono } from '@/app/fonts';
import React from 'react'

function BrandLogo() {
  const text = `< moon-light />`;
  return (
    <p
      className={`${fontMono.variable} px-4 text-lg font-semibold tracking-tight font-mono `}
    >
      {text}
    </p>
  );
}

export default BrandLogo