import { createBrowserRouter } from "react-router-dom";
import ContestHomePage from "../Components/ContestHomePage/ContestHomePage";
import Problem from "../Components/Problem/Problem";
import Login from "../Components/Login/Login";
import Protected from "../Hooks/Protected";
import Layout1 from "../Layouts/Layout1";
import Test from "../Components/Test/Test";
import ContestPreview from "../Components/ContestPreview/ContestPreview";
import HomePage from "../Components/HomePage/HomePage";
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
        element: <ContestPreview />,
      },
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
