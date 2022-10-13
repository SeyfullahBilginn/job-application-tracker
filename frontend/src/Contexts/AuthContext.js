/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState();
  // const navigate = useNavigate();
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(["user"]);
  const [signUpError, setSignUpError] = useState({
    code: "",
    message: "",
  });
  const navigate = useNavigate();

  function signUp(user) {
    axios
      .post("http://localhost:3001/users", user)
      .then((res) => {
        console.log(res);
        const { password, ...userData } = res.data;
        setUserCookie("user", userData);
        navigate("/home");
      })
      .catch((error) => {
        setSignUpError({
          code: error.response.status,
          message: error.response.data.message,
        });
      });
  }

  function logIn(user) {
    fetch("http://localhost:3001/users/login", {
      body: new URLSearchParams(user),
      method: "POST",
    })
      .then((response) => {
        response.json().then((result) => {
          console.log(result);
          setUserCookie("user", result);
          navigate("/home");
        });
      })
      .catch((error) => console.log(error));
  }

  async function logout() {
    await removeUserCookie("user");
    navigate("/log-in");
  }

  const value = {
    signUp,
    logIn,
    logout,
    userCookie,
    signUpError,
    setSignUpError,
    // updateUserCookie,
    // fetchUserToCookie,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
