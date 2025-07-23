import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "@/utils/constant";
import { toast } from "sonner";


function Signup() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    file: null,
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
};

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(input);
  // };


const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(ROUTES.SIGNUP_ENDPOINT, input);
    console.log(res);
    console.log(input);

    console.log("Signup Success:", res.data);

    if(res.data.status === 1 ){
      toast.success("User Signup Successfully");
      navigate('/login');
    }

  } catch (error) {
    console.error("Signup Error:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || error.message);
    // Show error message
  }
};

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-600 rounded-md p-4 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Full Name"
              value={input.name}
              name="name"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="nakum@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone</Label>
            <Input
              type="number"
              placeholder="8140777373"
              value={input.phone}
              name="phone"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className={"flex items-center gap-4 my-5"}>
              <div className="flex items-center space-x-2">
                <Input
                  type={"radio"}
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className={"cursor-pointer"}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type={"radio"}
                  name="role"
                  value="recuiter"
                  checked={input.role === "recuiter"}
                  onChange={changeEventHandler}
                  className={"cursor-pointer"}
                />
                <Label htmlFor="r2">Recuiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className={"cursor-pointer"}
              />
            </div>
          </div>
          <Button type="submit">Signup</Button>
          <span className="flex gap-2 my-1">
            Already have an Account?{" "}
            <Link className="text-blue-600" to={"/login"}>
              Login here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
