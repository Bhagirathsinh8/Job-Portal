import React from "react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";

function LatestJobCard() {
  return (
    <div className="p-5 rounded-md shadow-xl  bg-white border border-gray-100 cursor-pointer ">
      <div className="flex gap-3 my-2 items-center py-1 ">
        <div>
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" />
          </Avatar>
        </div>
        <div>
          <h1 className="font-medium text-xl">Goggle</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-xl">FrontEnd Developer - React JS</h1>
        <p>Work on Node.js and MongoDB.</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          2 Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
          Full-Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          8 LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCard;
