import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

function Job() {
  return (
    <div className="p-5 rounded-xl mx-auto shadow-xl  bg-white border border-gray-200 cursor-pointer ">
        <div className="flex justify-between items-center p-4">
        <p>2 days ago</p>
      <Button variant={"outline"} className={"rounded-full"} size={"icon"}>
        <Bookmark />
      </Button>
        </div>
      
      <div className="flex items-center gap-2 my-2">
<Button className={"p-6"} variant={"ghost"} size={"icon"}>
        <Avatar>
          <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" />
        </Avatar>
      </Button>
      <div className="flex flex-col font-medium text-sm">
  <h3 className="font-medium">Company Name</h3>
      <p className="text-gray-500">Location</p>
      </div>
     </div>
       <div>
        <h1 className="font-medium mb-2">Title</h1>
      <p className="text-gray-500 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veritatis, ea repellendus provident inventore quo.</p>
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
      <div className="mt-5 flex gap-4">
        <Button variant={"outline"}>More Details</Button>
        <Button variant={"ghost"} className={"bg-violet-400" }>Save For Later</Button>
      </div>
    </div>
  );
}

export default Job;
