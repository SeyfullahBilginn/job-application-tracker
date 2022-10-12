/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "@mui/material";
import { useAuth } from "Contexts/AuthContext";
import React, { useState } from "react";

function Login() {
  const { logIn, logout, userCookie } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    logIn({
      email,
      password,
    });
  }

  return (
    <div>
      {userCookie?.user?.firstName && <div>{userCookie.user.firstName}</div>}
      <button onClick={() => console.log(userCookie.user)}>see user cookie</button>
      <Button
        href="/sign-up"
        onClick={() => logout()}
        type="button"
        variant="contained"
        color="error"
      >
        Logout
      </Button>
      <Button href="/sign-up" type="button" variant="contained" color="secondary">
        Go to signup
      </Button>
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Email:
          <input
            type="mail"
            value={email}
            onChange={(text) => setEmail(text.currentTarget.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(text) => setPassword(text.currentTarget.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
