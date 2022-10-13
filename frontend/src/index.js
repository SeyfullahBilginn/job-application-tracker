import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthProvider } from "Contexts/AuthContext";
import { DrawerProvider } from "Contexts/DashboardContext";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <DrawerProvider>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </DrawerProvider>,
  document.getElementById("root")
);
