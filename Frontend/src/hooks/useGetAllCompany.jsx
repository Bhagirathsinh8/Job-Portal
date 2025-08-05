import React, { useEffect } from 'react'
import axios from "axios";
import { setAllCompany } from "@/redux/companySlice";
import { useDispatch } from "react-redux";
import { ROUTES } from '@/utils/constant';

function useGetAllCompany() {
      const token = localStorage.getItem('token');
      const dispatch = useDispatch();
    useEffect(()=>{
      const fetchAllCompany = async () =>{
        try {
          const res = await axios.get(ROUTES.GET_ALL_COMPANY,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          });

        if(res.data.success){
          dispatch(setAllCompany(res.data.data));
        }
        } catch (error) {
          console.log(error);
        }
        
      };
      fetchAllCompany();
  },[dispatch,token])
  
}

export default useGetAllCompany
