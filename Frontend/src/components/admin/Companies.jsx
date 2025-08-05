import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/utils/constant";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setsearchCompanybyText } from "@/redux/companySlice";

function Companies() {
  useGetAllCompany();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchCompanybyText(search));
  }, [search, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-1/2"
            placeholder="Filter the Company"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate(PATH.CREATE_COMPANY)}
          >
            New Company
          </Button>
        </div>

        <CompaniesTable search={search} />
      </div>
    </div>
  );
}

export default Companies;
