"use client";

import React from 'react'
import Logo from './logo';
import {NavigationBar} from './navigation';
import ActionNav from './actionNav';

const page = () => {
  return (
    <div className="flex justify-between items-center px-10 border-b h-20">
      {/* navbar bruh */}
      <Logo/>
      <NavigationBar/>
      <ActionNav/>
      

      {/* big screen */}

      {/* cards */}

    </div>
  )
}

export default page
