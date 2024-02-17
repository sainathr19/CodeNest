import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { AuthContext } from "../../Hooks/AuthProvider";
export default function Login() {
  const [Formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const Navigate = useNavigate();
  const { setLoggedin } = useContext(AuthContext);
  const login = () => {
    if (Formdata.username === "" || Formdata.password === "") {
      enqueueSnackbar("Invalid inputs!", { variant: "error" });
      return;
    }
    const options = {
      method: "POST",
      url: "http://localhost:3000",
      params: {},
      headers: {
        "content-type": "application/json",
      },
      data: {
        username: Formdata.username,
        password: Formdata.password,
      },
    };
    axios.request(options).then((res) => {
      if (res.data.result === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", Formdata.username);
        console.log("Suceess");
        setLoggedin(true);
        enqueueSnackbar("Login successfull!", { variant: "success" });
        setTimeout(() => {
          Navigate("/contest");
        }, 1000);
      } else if (res.data.result === "ude") {
        enqueueSnackbar("User not Found!", { variant: "error" });
        console.log("User doesn't Exist");
      } else {
        enqueueSnackbar("Wrong password!", { variant: "error" });
        console.log("Wrong password");
      }
    });
  };
  return (
    <div className="flex justify-center items-center h-[92vh]">
      <SnackbarProvider
        className="mt-[8vh]"
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
      <div className="login-form border border-slate-400 rounded-lg h-[60vh] w-[70vh]">
        <div className="login-head flex justify-center items-center border-b-2 w-full h-[8vh]">
          <p className="text-black text-lg">Login</p>
        </div>
        <div className="h-[40vh] w-full flex flex-col  justify-center items-center gap-5">
          <label
            for="Username"
            class=" w-1/2 relative block rounded-md border border-slate-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="Username"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              onInput={(e) => {
                setFormData({ ...Formdata, username: e.target.value });
              }}
            />

            <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Username
            </span>
          </label>
          <label
            for="Username"
            class="w-1/2 relative block rounded-md border border-slate-400 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="Username"
              class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Username"
              onInput={(e) => {
                setFormData({ ...Formdata, password: e.target.value });
              }}
            />

            <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Password
            </span>
          </label>
          <button
            class="mt-5 flex justify-center h-10 w-9  rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            onClick={login}
          >
            Login
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
