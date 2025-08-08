import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJob:[],
        allAdminJobs :[],
        singleJob :null,
        searchJobsByText :""
    },
    reducers:{
        setAllJobs:(state,action) =>{
           state.allJob = action.payload;
        },
        setSingleJob:(state,action) =>{
           state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) =>{
           state.allAdminJobs = action.payload;
        },
        setSearchJobsbyText:(state,action) =>{
           state.searchJobsByText = action.payload;
        },
        removeJobById: (state, action) => {
      state.allAdminJobs = state.allAdminJobs.filter(
        (job) => job._id !== action.payload
      );
    },
      // ✅ Add this reducer
    addNewJob(state, action) {
      state.allJob = [action.payload, ...state.allJob];
    },
    }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobsbyText,removeJobById,addNewJob} = jobSlice.actions;
export default jobSlice.reducer;