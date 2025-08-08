// import FilterCard from "@/components/job/FilterCard";
// import Job from "@/components/job/Job";
// import Navbar from "@/components/shared/Navbar";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Button } from "@/components/ui/button"; // Update as per your button component
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // If using shadcn/ui

// function Jobs() {
//   const { allJob } = useSelector((store) => store.jobs);
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-5">
//         {/* Mobile filter button */}
//         <div className="md:hidden px-4 mb-4">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" className="w-full">
//                 Filter Jobs
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[80%] sm:w-[60%] mx-auto">
//               <SheetHeader>
//                 <SheetTitle>Filters</SheetTitle>
//               </SheetHeader>
//               <FilterCard />
//             </SheetContent>
//           </Sheet>
//         </div>

//         <div className="flex gap-5">
//           {/* Desktop FilterCard */}
//           <div className="hidden md:block w-[20%]">
//             <FilterCard />
//           </div>

//           {/* Job listing */}
//           <div className="w-full md:w-[80%] flex-1 h-[88vh] overflow-y-auto pb-5">
//             {allJob.length <= 0 ? (
//               <div className="text-center my-2 text-red-500 font-bold">
//                 <span>No Job Found!</span>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {allJob.map((job) => (
//                   <div key={job?._id}>
//                     <Job job={job} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Jobs;

import FilterCard from "@/components/job/FilterCard";
import Job from "@/components/job/Job";
import Navbar from "@/components/shared/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { io } from "socket.io-client";
import { addNewJob } from "@/redux/jobSlice";


const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000"); // adjust as needed

function Jobs() {
  const dispatch = useDispatch();
  const { allJob } = useSelector((store) => store.jobs);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Listen for real-time job-added event
    socket.on("job-added", (newJob) => {
      dispatch(addNewJob(newJob));
    });

    return () => {
      socket.off("job-added");
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        {/* Mobile filter button */}
        <div className="md:hidden px-4 mb-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                Filter Jobs
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[60%] mx-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FilterCard />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-5">
          {/* Desktop FilterCard */}
          <div className="hidden md:block w-[20%]">
            <FilterCard />
          </div>

          {/* Job listing */}
          <div className="w-full md:w-[80%] flex-1 h-[88vh] overflow-y-auto pb-5">
            {allJob.length <= 0 ? (
              <div className="text-center my-2 text-red-500 font-bold">
                <span>No Job Found!</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allJob.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
