// import React, { useEffect } from "react";
// import Navbar from "../shared/Navbar";
// import ApplicantTable from "./ApplicantTable";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllApplicants } from "@/redux/applicationSlice";
// import { ROUTES } from "@/utils/constant";


// function Applicant() {
//   const { id } = useParams();
//   const token = localStorage.getItem("token");
//   const dispatch = useDispatch();
//   const {applicants} = useSelector(store=>store.application)


//   useEffect(()=>{
//     const fetchAllApplicant = async() =>{
//       try {
//          const res = await axios.get(ROUTES.GET_ALL_APPLICANT(id),{
//         headers:{
//           Authorization: `Bearer ${token}`
//         }
//       })

//       if(res.data.success){
//         // console.log(res.data.data);
//         dispatch(setAllApplicants(res.data.data));
//       }
//       } catch (error) {
//         console.log(error);
//         toast.error(error.response?.data.message);
//       }
     
//     }
//     fetchAllApplicant()
//   },[dispatch, id, token])

//   return (
//     <div>
//       <Navbar />
//   <div className="max-w-7xl mx-auto">
//     <h1 className="font-bold text-xl my-5">Applicant {applicants?.length} </h1>
//     <ApplicantTable />
//   </div>
//     </div>
//   );
// }

// export default Applicant;

import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantTable from "./ApplicantTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { ROUTES } from "@/utils/constant";
import Footer from "../home/Footer";

function Applicant() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicant = async () => {
      try {
        const res = await axios.get(ROUTES.GET_ALL_APPLICANT(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.data));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message);
      }
    };
    fetchAllApplicant();
  }, [dispatch, id, token]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1">
        {/* Heading */}
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl my-4 sm:my-5">
          Applicant{" "}
          <span className="text-gray-600">({applicants?.length || 0})</span>
        </h1>

        {/* Table Wrapper - Scroll on mobile */}
        <div className="overflow-x-auto rounded-lg shadow-sm bg-white p-3 sm:p-4">
          <ApplicantTable />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Applicant;
