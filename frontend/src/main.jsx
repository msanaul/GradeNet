import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import Studentlogin from "./components/Studentlogin.jsx";
import Teacherlogin from "./components/Teacherlogin.jsx";
import Question from "./components/Question.jsx";
import Answer from "./components/Answer.jsx";
import Register from "./components/Register.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "student-login",
        element: <Studentlogin />,
      },
      {
        path: "teacher-login",
        element: <Teacherlogin />,
      },
      {
        path: "ques",
        element: <Question />,
      },
      {
        path: "answer",
        element: <Answer />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
