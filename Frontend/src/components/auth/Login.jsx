import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { ROUTES } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, setLoading, } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "student1@gmail.com",
    password: "test@123",
    role: "",
  });
  const {loading} = useSelector((store)=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      dispatch(loginStart());
      const res = await axios.post(ROUTES.LOGIN_ENDPOINT, input);
      const token = res.data.data.token;
      const user = res.data.data.user;
      dispatch(loginSuccess(user)); 

      if (res.data.success) {
        localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Signup Error:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
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
          <h1 className="font-bold text-xl mb-5">Login</h1>
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
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <RadioGroup className={"flex items-center gap-4 my-5"}>
            <div className="flex items-center space-x-2">
              <Input
                type={"radio"}
                name={"role"}
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
            </div><br/>
            <div className="flex items-center space-x-2">
              <Input
                type={"radio"}
                name="role"
                value="admin"
                checked={input.role === "admin"}
                onChange={changeEventHandler}
                className={"cursor-pointer"}
              />
              <Label htmlFor="r3">Admin</Label>
            </div>
          </RadioGroup>
          {
            loading ? <Button className={'w-full my-4'}> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait</Button> :<Button type="submit" className={'w-full my-4'}>Login</Button>
          }
          
          <span className="flex items-center gap-4 my-2">
            Dont't have an Account?{" "}
            <Link to={"/signup"} className="text-blue-600">
              Signup here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
