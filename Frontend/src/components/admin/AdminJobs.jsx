import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/utils/constant";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchJobsbyText } from "@/redux/jobSlice";
import Footer from "../home/Footer";

function AdminJobs() {
  useGetAllAdminJobs();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobsbyText(search));
  }, [search, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-6 sm:my-10">
        {/* Search + Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-5">
          <Input
            className="w-full sm:w-1/2"
            placeholder="Filter the Job"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate(PATH.POST_JOB)}
          >
            New Job
          </Button>
        </div>

        {/* Table with scroll on mobile */}
        <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
          <AdminJobsTable />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AdminJobs;
