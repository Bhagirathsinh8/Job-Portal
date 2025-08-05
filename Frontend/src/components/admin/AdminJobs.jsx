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

function AdminJobs() {
  useGetAllAdminJobs();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobsbyText(search));
  }, [search, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-1/2"
            placeholder="Filter the Job"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate(PATH.POST_JOB)}
          >
          New Jobs
          </Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}

export default AdminJobs;
