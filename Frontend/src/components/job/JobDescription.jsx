import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Share2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);
  const isAppliedInitial =
    singleJob?.applications?.some(
      (application) => application.applicant_id === user._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isAppliedInitial);

  const token = localStorage.getItem("token");

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/applications/post",
        {
          jobId: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === 1) {
        setIsApplied(true);
        const updateJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            { applicant_id: user?._id },
          ],
        };
        dispatch(setSingleJob(updateJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/job/${jobId}`);
        console.log(res.data.data);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.data));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant_id === user._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    if (singleJob && user) {
      const alreadyApplied = singleJob.applications?.some(
        (application) => application.applicant_id === user._id
      );
      setIsApplied(alreadyApplied);
    }
  }, [singleJob, user]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 border border-gray-200 rounded-2xl p-5 shadow-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img src={singleJob?.company?.logo} className="h-20 w-20" />
            {/* <Avatar className="h-20 w-20">
              <AvatarImage src={singleJob?.company?.logo} />
            </Avatar> */}
            <div>
              <h1 className="font-bold text-xl">{singleJob?.company?.name}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                  {singleJob?.salary}
                </Badge>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Share2 className="cursor-pointer" />
            <Button
              onClick={applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#510186]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-center md:text-left">
          Job Details
        </h1>
        <div className="space-y-2  md:text-left text-sm sm:text-base">
          <h1 className="font-bold">
            Description:
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold">
            Role:
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold">
            Location:
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold">
            Job Type:
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold">
            Requirement:
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.requirement}
            </span>
          </h1>
          <h1 className="font-bold">
            Applications:
            <span className="pl-2 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}

export default JobDescription;
