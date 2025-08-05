import { createSlice } from "@reduxjs/toolkit";
import { Search } from "lucide-react";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    allCompany: [],
    searchCompanybyText: "",
  },
  reducers: {
     
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },

    //Set All List of Company = Get All
    setAllCompany: (state, action) => {
      state.allCompany = action.payload;
    },

    //Remove Company
    removeCompanyById: (state, action) => {
      state.allCompany = state.allCompany.filter(
        (company) => company._id !== action.payload
      );
    },

    setsearchCompanybyText: (state, action) => {
      state.searchCompanybyText = action.payload;
    },
  },
});

export const { setSingleCompany, setAllCompany, removeCompanyById ,setsearchCompanybyText} =
  companySlice.actions;
export default companySlice.reducer;
