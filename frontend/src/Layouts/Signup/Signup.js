/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useAuth } from "Contexts/AuthContext";
import Drawer from "Drawer/Drawer";
import { Button } from "@mui/material";

function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userType, setUserType] = useState(0);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signUp, signUpError } = useAuth();
  const { setSignUpError } = useAuth();
  function handleSubmit(event) {
    event.preventDefault();
    signUp({
      firstName,
      lastName,
      email,
      userType,
      password,
    });
  }

  useEffect(() => {
    setSignUpError({});
  }, []);

  return (
    <div>
      <Button href="/log-in" type="button" variant="contained" color="secondary">
        Go to log in
      </Button>
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(text) => setFirstName(text.currentTarget.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(text) => setLastName(text.currentTarget.value)}
          />
        </label>
        <label>
          Designation student 1sad:
          <input
            type="number"
            value={userType}
            onChange={(text) => setUserType(text.currentTarget.value)}
          />
        </label>
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
      {signUpError && (
        <div>
          error code: {signUpError.code} message: {signUpError.message}
        </div>
      )}
    </div>
  );
}

export default Signup;
