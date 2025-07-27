import FilterCard from "@/components/job/FilterCard";
import Job from "@/components/job/Job";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8,9];
// const jobArray = [];
function Jobs() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          <div className="w-80% flex-1 h-[88vh] overflow-y-auto pb-5">
            {
            jobArray.length <= 0 ? (
              <div className="text-center my-2 text-red-500 font-bold">
                <span className="">No Job Found!</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 ">
                {
                jobArray.map(() => <Job/>)
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
