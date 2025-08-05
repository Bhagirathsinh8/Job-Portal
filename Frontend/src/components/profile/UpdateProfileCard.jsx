import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ROUTES } from "@/utils/constant";
import { loginSuccess } from "@/redux/authSlice";
import { toast } from "sonner";

function UpdateProfileCard({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");

  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.profile.bio,
    skills: user?.profile.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all fields to FormData
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    // Append file if it exists
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(ROUTES.PROFILE_UPDATE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Profile updated:", res.data);
      if (res.data.success) {
        dispatch(loginSuccess(res.data.data));
       
      }
    } catch (error) {
      // console.error("Update failed:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay />
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={() => {
          setOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            You can update your name, skills, and more here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={input.name}
                type={"text"}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                className="col-span-3"
                value={input.email}
                type={"email"}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={input.phone}
                className="col-span-3"
                type={"text"}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                className="col-span-3"
                value={input.skills}
                type={"text"}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                className="col-span-3"
                type={"text"}
                value={input.bio}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                className="col-span-3"
                type={"file"}
                accept="application/pdf"
                onChange={changeFileHandler}
              />
            </div>
            <DialogFooter>
              {loading ? (
                <Button className={"w-full my-4"}>
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </Button>
              ) : (
                <Button type="submit" className={"w-full my-4"}>
                  Update
                </Button>
              )}
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileCard;
