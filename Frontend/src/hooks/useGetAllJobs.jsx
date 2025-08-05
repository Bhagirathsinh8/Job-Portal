import { setAllJobs } from '@/redux/jobSlice';
import { ROUTES } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
        useEffect(()=>{
            const fetchAllJobs = async () => {
                try {
                    const res = await axios.get(ROUTES.GET_ALL_JOB);
                    
                    if(res.data.success){
                        dispatch(setAllJobs(res.data.data));
                    }

                } catch (error) {
                    console.log(error);
                }
            } 
            fetchAllJobs();
        },[dispatch])
}

export default useGetAllJobs
