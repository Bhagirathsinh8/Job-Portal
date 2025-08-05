import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, FileUser, Mail, Pen, ShieldUser } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useState } from "react";
import UpdateProfileCard from "./UpdateProfileCard";


const applicationlist = [1, 2, 3, 4];

function ProfilePage() {
  const { user } = useSelector((store) => store.auth);
  const [open,setOpen] = useState(false);
  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                // src="https://wallpapers.com/images/featured-full/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                src={user?.profile?.profilePhoto}
              />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-medium text-xl">{user.name}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <div className="self-end md:self-start">
            <Button
            onClick = {()=>setOpen(true)} 
            variant="outline" className="mt-4 md:mt-0 text-right">
              <Pen />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <Mail />
            <h2 className="text-sm sm:text-base">{user.email}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Contact />
            <h2 className="text-sm sm:text-base">{user.phone}</h2>
          </div>
          <div className="flex items-center gap-2">
            <ShieldUser className="text-red-600" />
            <h2 className="text-sm sm:text-base capitalize">{user.role}</h2>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h1 className="font-bold text-xl mb-3">Skills</h1>
          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills.length <= 0 ? (
              <span>No Skills</span>
            ) : (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <FileUser />
            <h1 className="font-bold text-xl">Resume</h1>
          </div>
          <a
            href={user?.profile?.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="link" className="text-blue-500">
              {user.profile.resumeOriginalName}
            </Button>
          </a>
        </div>
      </div>

      {/* Application Table */}
      <div className="max-w-7xl mx-auto p-4 sm:p-5 my-5 overflow-x-auto">
        <h1 className="font-bold text-2xl mb-4">Application List</h1>
        <Table className="min-w-[600px]">
          <TableCaption>Application List of User</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicationlist.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://wallpapers.com/images/featured-full/cool-profile-picture-87h46gcobjl5e4xu.jpg" />
                  </Avatar>
                </TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right space-x-2">
                  <Badge
                    className="bg-red-600 font-bold text-white"
                    variant="ghost"
                  >
                    Pending
                  </Badge>
                  {/* <Badge className="bg-green-600 font-bold text-white" variant="ghost">
                    Accepted
                  </Badge> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
          <UpdateProfileCard open ={open} setOpen={setOpen}/>
    </div>
  );
}

export default ProfilePage;
