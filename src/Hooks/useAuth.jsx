import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
export default function useAuth() {
  const navigate = useNavigate();
  if (localStorage.getItem("username")) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    navigate("/login");
  }
}
