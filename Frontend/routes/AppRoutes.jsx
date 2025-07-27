// src/routes/AppRoutes.jsx
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import { PATH } from "@/utils/constant";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Home />,
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PATH.SIGNUP,
    element: <Signup />,
  },
  {
    path: PATH.JOBS,
    element: <Jobs/>
  },
  {
    path: PATH.BROWSER,
    element: <Signup />,
  },
  {
    path: PATH.ADMIN_DASHBOARD,
    element: <Signup />,
  },
]);

export default appRouter;
