import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
        useEffect(()=>{
            const fetchSingleCompany = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/company/${companyId}`,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    });
                    
                    if(res.data.success){
                        dispatch(setSingleCompany(res.data.data));
                    }

                } catch (error) {
                    console.log(error);
                }
            } 
            fetchSingleCompany();
        },[companyId, dispatch, token])
}

export default useGetCompanyById
