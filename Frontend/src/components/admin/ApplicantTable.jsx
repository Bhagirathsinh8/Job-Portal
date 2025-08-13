import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CircleArrowRight, MoreHorizontal, X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { ROUTES } from "@/utils/constant";

const shortListingStatus = ["accepted", "rejected"];

const ApplicantTable = () => {
  const token = localStorage.getItem("token");
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.patch(
        ROUTES.UPDATE_APPLICATION_STATUS(id),
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Status Update Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Table for medium+ screens */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>List of Applicant</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant_id?.name}</TableCell>
                <TableCell>{item?.applicant_id?.email}</TableCell>
                <TableCell>{item?.applicant_id?.phone}</TableCell>
                <TableCell>
                  <a
                    className="text-blue-500 cursor-pointer"
                    href={item?.applicant_id?.profile?.resume}
                    target="_blank"
                  >
                    {item?.applicant_id?.profile?.resumeOriginalName}
                  </a>
                </TableCell>
                <TableCell>{item.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                          onClick={() => {
                            statusHandler(status, item._id);
                          }}
                        >
                          <span className="mr-1">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                          {status === "accepted" ? (
                            <CircleArrowRight className="text-green-500" />
                          ) : (
                            <X className="text-red-600" />
                          )}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card view for small screens */}
      <div className="block md:hidden space-y-4">
        {applicants.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-sm p-4 border"
          >
            <p className="font-semibold">{item?.applicant_id?.name}</p>
            <p className="text-sm text-gray-600">{item?.applicant_id?.email}</p>
            <p className="text-sm">{item?.applicant_id?.phone}</p>
            <p className="text-sm">
              <a
                className="text-blue-500"
                href={item?.applicant_id?.profile?.resume}
                target="_blank"
              >
                {item?.applicant_id?.profile?.resumeOriginalName}
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {item.createdAt?.split("T")[0] || "N/A"}
            </p>
            <div className="mt-3 flex gap-3">
              {shortListingStatus.map((status, index) => (
                <button
                  key={index}
                  onClick={() => statusHandler(status, item._id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium border ${
                    status === "accepted"
                      ? "border-green-500 text-green-500"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status === "accepted" ? (
                    <CircleArrowRight size={16} />
                  ) : (
                    <X size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantTable;
