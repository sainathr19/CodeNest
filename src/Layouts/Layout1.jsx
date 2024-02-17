import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout1() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="main flex flex-col h-[92vh]">
        <Outlet />
      </div>
    </div>
  );
}
