import React, { createContext, useReducer, useState } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Landing from "./pages/Landing/Landing";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Lists from "./pages/Lists/Lists";
import Profile from "./pages/Profile/Profile";
import Plot from "./pages/Plot/Plot";
import App from "./App";
import ThemeContextProvider from "./components/Toggle/ContextProvider";

import { AuthContextProvider } from "./firebase/AuthContext";
import TrendingList from "./pages/Trend/Trend";
import Bookmark from "./pages/Bookmark/Bookmark";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/lists",
    element: <Lists />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/plot",
    element: <Plot />,
  },
  {
    path: "/trend",
    element: <TrendingList />,
  },
  {
    path: "/bookmark",
    element: <Bookmark />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
