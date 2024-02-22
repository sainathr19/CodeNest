import { createBrowserRouter } from "react-router-dom";
import ContestHomePage from "../Components/ContestHomePage/ContestHomePage";
import Problem from "../Components/Problem/Problem";
import Login from "../Components/Login/Login";
import Protected from "../Hooks/Protected";
import Layout1 from "../Layouts/Layout1";
import Test from "../Components/Test/Test";
import ContestPreview from "../Components/ContestPreview/ContestPreview";
import HomePage from "../Components/HomePage/HomePage";
import Submission from "../Components/Submission/Submission";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout1 />,
    children: [
      {
        path: "contest",
        element: (
          <Protected>
            <ContestHomePage />
          </Protected>
        ),
      },
      {
        path: "problem/:pid",
        element: (
          <Protected>
            <Problem />
          </Protected>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "preview",
        element: (
          <Protected>
            <ContestPreview />
          </Protected>
        ),
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "submission",
        element: (
          <Protected>
            <Submission />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
