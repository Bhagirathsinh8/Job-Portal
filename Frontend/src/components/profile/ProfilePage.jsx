import { useEffect, useState } from "react";
import axios from "axios";
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
import UpdateProfileCard from "./UpdateProfileCard";
import { ROUTES } from "@/utils/constant";
import Job from "../job/Job";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

function ProfilePage() {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // items per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
            `${ROUTES.GET_MY_APPLICATIONS}?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            // withCredentials: true,
          }
        );

        setApplications(res.data.data.applications || []);
        setTotalPages(res.data.data.pages || 1);
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token, page, limit]);

  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-4 sm:p-6 md:p-8">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto || ""} />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-medium text-xl">{user?.name}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <div className="self-end md:self-start">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mt-4 md:mt-0 text-right"
            >
              <Pen />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <Mail />
            <h2 className="text-sm sm:text-base">{user?.email}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Contact />
            <h2 className="text-sm sm:text-base">{user?.phone}</h2>
          </div>
          <div className="flex items-center gap-2">
            <ShieldUser className="text-red-600" />
            <h2 className="text-sm sm:text-base capitalize">{user?.role}</h2>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h1 className="font-bold text-xl mb-3">Skills</h1>
          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))
            ) : (
              <span>No Skills</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <FileUser />
            <h1 className="font-bold text-xl">Resume</h1>
          </div>

          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="text-blue-500">
                {user?.profile?.resumeOriginalName || "View Resume"}
              </Button>
            </a>
          ) : (
            <span>No Resume Uploaded</span>
          )}
        </div>
      </div>

      {/* Application Table */}
      <div className="max-w-7xl mx-auto p-4 sm:p-5 my-5 overflow-x-auto">
        <h1 className="font-bold text-2xl mb-4">Application List</h1>

        {loading ? (
          <p className="animate-pulse text-gray-500">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
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
              {applications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          app.jobId?.company?.logo ||
                          "https://via.placeholder.com/40"
                        }
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{app.jobId?.title}</TableCell>
                  <TableCell>{app.jobId?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        app.status === "pending"
                          ? "bg-yellow-500"
                          : app.status === "accepted" || app.status === "hired"
                          ? "bg-green-600"
                          : "bg-red-600"
                      } font-bold text-white capitalize`}
                      variant="ghost"
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="flex justify-center gap-2 mt-4">
          <Button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="px-2 py-1 bg-gray-200 rounded">
            Page {page} of {totalPages}
          </span>

          <Button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <UpdateProfileCard open={open} setOpen={setOpen} />
    </div>
  );
}

export default ProfilePage;
