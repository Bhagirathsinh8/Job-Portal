import React from "react";
import Navbar from "../shared/Navbar";
import Job from "../job/Job";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useSelector } from "react-redux";
import CompanyCard from "../job/CompanyCard";

function Browse_All_Company() {
  // const allCompany = [1, 2, 3,4];
  useGetAllCompany()
   const {allCompany} =useSelector((store)=>store.company)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        {/* <h1 className="font-bold text-xl my-10">Search Results {randomJob.length}</h1> */}
        {/* <h1 className="font-bold text-xl my-10">Total Companies {randomJob.length}</h1> */}
        <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 ">
          {allCompany.map((company, index) => {
            return <CompanyCard  key={index} company ={company}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse_All_Company;
