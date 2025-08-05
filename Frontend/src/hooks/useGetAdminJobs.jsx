import { setAllAdminJobs } from "@/redux/jobSlice";
import { ROUTES } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(ROUTES.GET_ALL_ADMIN_JOBS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch,token]);
};

export default useGetAllAdminJobs;
