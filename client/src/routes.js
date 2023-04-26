import Home from "./components/Home";
import { Login } from "./components/Login";
import Profile from "./components/Profile";
import React from "react";
import CreateQuote from "./components/CreateQuote";
import { Signup } from "./components/SignupPage";
import OtherProfile from "./components/OtherUsers";
import ErrorPage from "./components/404";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "addQuote",
    element: <CreateQuote />,
  },
  {
    path: "profile/:userId",
    element: <OtherProfile />,
  },
  {
    path: "*",
    element: <ErrorPage />
  }
];

export default routes;
