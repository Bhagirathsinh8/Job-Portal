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
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import Footer from "../home/Footer";


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
  const dispatch = useDispatch();
  const {loading} = useSelector((store)=>store.auth)

  const changeEventHandler = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
};

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

const submitHandler = async (e) => {
  e.preventDefault();
   
  try {
    dispatch(setLoading(true));

    const formData = new FormData();

    // Append all fields to FormData
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);

    // Append file if it exists
    if (input.file) {
      formData.append("file", input.file);
    }

    // Send request to backend
    const res = await axios.post(ROUTES.SIGNUP_ENDPOINT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Signup Success:", res.data);

    if(res.data.status === 1 ){
      toast.success("User Signup Successfully");
      navigate('/login');
    }

  } catch (error) {
    console.error("Signup Error:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || error.message);
    // Show error message
  } finally {
    dispatch(setLoading(false));
  }
};

  // return (
  //   <div>
  //     <Navbar />
  //     <div className="flex items-center justify-center max-w-7xl mx-auto">
  //       <form
  //         className="w-1/2 border border-gray-600 rounded-md p-4 my-10"
  //         onSubmit={submitHandler}
  //       >
  //         <h1 className="font-bold text-xl mb-5">Signup</h1>
  //         <div className="my-2">
  //           <Label>Full Name</Label>
  //           <Input
  //             type="text"
  //             placeholder="Full Name"
  //             value={input.name}
  //             name="name"
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div className="my-2">
  //           <Label>Email</Label>
  //           <Input
  //             type="email"
  //             placeholder="nakum@gmail.com"
  //             value={input.email}
  //             name="email"
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div className="my-2">
  //           <Label>Phone</Label>
  //           <Input
  //             type="number"
  //             placeholder="8140777373"
  //             value={input.phone}
  //             name="phone"
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div className="my-2">
  //           <Label>Password</Label>
  //           <Input
  //             type="password"
  //             placeholder="password"
  //             value={input.password}
  //             name="password"
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <RadioGroup className={"flex items-center gap-4 my-5"}>
  //             <div className="flex items-center space-x-2">
  //               <Input
  //                 type={"radio"}
  //                 name="role"
  //                 value="student"
  //                 checked={input.role === "student"}
  //                 onChange={changeEventHandler}
  //                 className={"cursor-pointer"}
  //               />
  //               <Label htmlFor="r1">Student</Label>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <Input
  //                 type={"radio"}
  //                 name="role"
  //                 value="recuiter"
  //                 checked={input.role === "recuiter"}
  //                 onChange={changeEventHandler}
  //                 className={"cursor-pointer"}
  //               />
  //               <Label htmlFor="r2">Recuiter</Label>
  //             </div>
  //           </RadioGroup>
  //           <div className="flex items-center gap-2">
  //             <Label>Profile</Label>
  //             <Input
  //               accept="image/*"
  //               type="file"
  //               name="file"
  //               onChange={changeFileHandler}
  //               className={"cursor-pointer"}
  //             />
  //           </div>
  //         </div>
  //           {
  //             loading ? <Button className={'w-full my-4'}> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait!</Button> :<Button type="submit" className={'w-full my-4'}>Signup</Button>
  //           }
  //         <span className="flex gap-2 my-1">
  //           Already have an Account?{" "}
  //           <Link className="text-blue-600" to={"/login"}>
  //             Login here! 
  //           </Link>
  //         </span>
  //       </form>
  //     </div>
  //   </div>
  // );

return (
  <div>
    <Navbar />
    <div className="flex items-center justify-center px-4 md:px-6 lg:px-0 max-w-7xl mx-auto">
      <form
        className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 border border-gray-300 rounded-md p-4 md:p-6 lg:p-8 my-10 shadow-sm"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-xl mb-5 text-center">Signup</h1>

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

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-4">
          <RadioGroup className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recuiter"
                checked={input.role === "recuiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              onChange={changeFileHandler}
              className="cursor-pointer w-full md:w-auto"
            />
          </div>
        </div>

        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait!
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
        )}

        <span className="flex flex-col sm:flex-row sm:items-center gap-2 text-center text-sm mt-2">
          Already have an account?
          <Link className="text-blue-600" to="/login">
            Login here!
          </Link>
        </span>
      </form>
    </div>
    <Footer/>
  </div>
);

}

export default Signup;
