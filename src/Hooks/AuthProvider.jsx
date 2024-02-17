import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [Loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const url =
        "http://localhost:3000/is-authenticated?token=" +
        localStorage.getItem("token");
      axios.get(url).then((res) => {
        if (res.data === "JsonWebTokenError") {
          setLoggedin(false);
        } else {
          setLoggedin(true);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ Loggedin, setLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
}
