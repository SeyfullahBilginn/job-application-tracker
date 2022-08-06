import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthProvider } from "Contexts/AuthContext";
import { DrawerProvider } from "Contexts/DashboardContext";

ReactDOM.render(
  <DrawerProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </DrawerProvider>,
  document.getElementById("root")
);
