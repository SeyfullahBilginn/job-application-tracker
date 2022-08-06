/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useCookies } from "react-cookie";
import axios from "axios";

const DrawerContext = React.createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export function DrawerProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = { open, setOpen };

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}
