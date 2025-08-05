import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

function CompanySetup() {
  const token = localStorage.getItem("token");
  const params = useParams();
  const companyId = params.id;
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.description ||  "",
      location: singleCompany.location ||  "",
      file: singleCompany.file ||  "",
    });
  },[singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chnageFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:5000/api/company/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Company Update Successfully");
        navigate(PATH.COMPANY);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

return (
  <div>
    <Navbar />
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-0 my-10">
      <form onSubmit={submitHandler} className="border border-gray-200 p-5 rounded-md shadow-sm">
        {/* Header with Back and Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-8">
          <Button
            type="button"
            className="flex items-center gap-2 text-gray-500 font-semibold w-fit"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Company Name</Label>
            <Input
              type="text"
              className="my-2"
              onChange={changeEventHandler}
              value={input.name}
              name="name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              className="my-2"
              onChange={changeEventHandler}
              value={input.description}
              name="description"
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              type="text"
              className="my-2"
              onChange={changeEventHandler}
              value={input.website}
              name="website"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              className="my-2"
              onChange={changeEventHandler}
              value={input.location}
              name="location"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              type="file"
              accept="image/*"
              className="my-2"
              onChange={chnageFileHandler}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          {loading ? (
            <Button className="w-full mt-8" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8">
              Update
            </Button>
          )}
        </div>
      </form>
    </div>
  </div>
);


}

export default CompanySetup;
