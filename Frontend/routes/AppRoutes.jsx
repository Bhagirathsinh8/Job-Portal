// src/routes/AppRoutes.jsx
import AdminJobs from "@/components/admin/AdminJobs";
import Applicant from "@/components/admin/Applicant";
import Companies from "@/components/admin/Companies";
import CompanyCreate from "@/components/admin/CompanyCreate";
import CompanySetup from "@/components/admin/CompanySetup";
import PostJob from "@/components/admin/PostJob";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Browse from "@/components/browse/Browse";
import JobDescription from "@/components/job/JobDescription";
import ProfilePage from "@/components/profile/ProfilePage";
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
    element: <Jobs />,
  },
  {
    path: PATH.BROWSER,
    element: <Browse />,
  },
  {
    path: PATH.ADMIN_DASHBOARD,
    element: <Signup />,
  },
  {
    // path: PATH.PROFILE,
    path: PATH.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: PATH.JOB_DESCRIPTION,
    element: <JobDescription />,
  },

  //admin route
  {
    path: PATH.COMPANY,
    element: <Companies />,
  },
  {
    path: PATH.CREATE_COMPANY,
    element: <CompanyCreate/>,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup/>,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs/>,
  },
  {
    path: PATH.POST_JOB,
    element: <PostJob/>,
  },
  {
    path: "/admin/job/:id/applicant",
    element: <Applicant/>,
  }
]);

export default appRouter;
