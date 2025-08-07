import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PATH, ROUTES } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
  });
  const token = localStorage.getItem("token");
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const registerCompany = async () => {
    try {
      const res = await axios.post(ROUTES.CREATE_COMPANY, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.data));
        toast.success("Company Added Successfully");
        const companyId = res.data?.data._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Add Your Company</h1>
          <p className="text-gray-500 mt-3">Enter your company name</p>
        </div>

        <div className="mb-6">
          <Label htmlFor="name">Company Name</Label>
          <Input
            type="text"
            className="mt-2"
            placeholder="JobHunt, Microsoft"
            onChange={changeEventHandler}
            value={input.name}
            name="name"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(PATH.COMPANY)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={registerCompany} className="w-full sm:w-auto">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
