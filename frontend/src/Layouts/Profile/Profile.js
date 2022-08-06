/* eslint-disable react/button-has-type */
import { useAuth } from "Contexts/AuthContext";
import Drawer from "Drawer/Drawer";
import Header from "Header/Header";
import React from "react";

export default function Profile() {
  const { userCookie, logout } = useAuth();

  return (
    <div>
      <div>PROFILE</div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
