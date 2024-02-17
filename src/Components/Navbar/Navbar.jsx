import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../Hooks/AuthProvider";
export default function Navbar() {
  const { Loggedin, setLoggedin } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between bg-yellow-500 h-[8vh] min-h-max p-3 items-center pl-8 pr-9">
      {Loggedin && (
        <div className="profile flex items-center gap-1">
          <img
            className="h-5 w-5"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItcm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNSIvPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYgMCIvPjwvc3ZnPg=="
            alt=""
          />
          <p>{localStorage.getItem("username")}</p>
        </div>
      )}
      <div className="logo flex gap-1">
        <p className="font-bold text-2xl tracking-wide">THE HIVE</p>
      </div>
      {Loggedin && (
        <Link
          to="/login"
          onClick={() => {
            localStorage.clear();
            setLoggedin(false);
          }}
        >
          Logout
        </Link>
      )}
      {!Loggedin && (
        <Link
          onClick={() => {
            console.log("clicked");
          }}
          to="/login"
        >
          Login
        </Link>
      )}
    </div>
  );
}
