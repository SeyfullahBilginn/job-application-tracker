import { useAuth } from "Contexts/AuthContext";
import Drawer from "Drawer/Drawer";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "Header/Header";

export default function App() {
  const { userCookie } = useAuth();
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    console.log(userCookie.user);
  }, [userCookie.user]);
  const getRoutes = () =>
    routes.map((route) => {
      if (route.route) {
        if (userCookie.user) {
          return (
            <Route
              exact={route.exact}
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
        }
        if (!userCookie.user && !route.isLoggedIn) {
          console.log(route.route);
          return (
            <Route
              exact={route.exactF}
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
        }
      }
      return null;
    });

  if (!userCookie.user) {
    return <Routes>{getRoutes()}</Routes>;
  }

  return (
    <>
      <Header />
      <Routes>{getRoutes()}</Routes>
    </>
  );
}
