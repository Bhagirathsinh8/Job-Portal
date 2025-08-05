import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function    Job({job}) {
  const jobId = job?._id;
  const navigate = useNavigate();

  const dayAgoFunction = (mongoTime) =>{
    const createdAt = new Date(mongoTime);
    const currentDate = new Date();
    const timeDiff = currentDate - createdAt ;
    return Math.floor(timeDiff/(1000*24*60*60))
  }
  return (
    <div className="p-3 rounded-xl mx-auto shadow-xl mt-1 bg-white border border-gray-200 cursor-pointer ">
      <div className="flex justify-between items-center  ">
        <p className="text-sm text-gray-500"> {dayAgoFunction(job?.createdAt) === 0 ? "Today" : `${dayAgoFunction(job?.createdAt)} Days Ago`}</p>
        <Button variant={"outline"} className={"rounded-full"} size={"icon"}>
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-3">
        <Button className={"p-6"} variant={"ghost"} size={"icon"}>
          <Avatar >
            <AvatarImage src={job?.company?.logo}  />
          </Avatar>
        </Button>
        <div className="flex flex-col font-medium text-sm">
          <h3 className="font-medium">{job?.company?.name}</h3>
          <p className="text-sm text-gray-500 ">{job?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-medium mb-2">{job?.title}</h1>
        <p className="text-gray-500 mb-3 text-sm">
         {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
           {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job?.salary}
        </Badge>
      </div>
      <div className="mt-5 flex gap-4">
        <Button variant={"outline"} onClick = {()=>navigate(`/job/description/${jobId}`)}>More Details</Button>
        <Button variant={"outline"} className={"bg-violet-800 text-white"}>
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
