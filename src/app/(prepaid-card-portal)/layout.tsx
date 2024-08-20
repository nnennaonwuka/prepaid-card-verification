"use client";
import isAuth from "@/components/isAuth";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default isAuth(HomeLayout);
