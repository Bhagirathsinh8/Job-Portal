import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { removeCompanyById } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constant";

function CompaniesTable() {
  const { allCompany, searchCompanybyText } = useSelector(
    (store) => store.company
  );
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [filterCompany, SetFilterCompany] = useState(allCompany);
  
  useEffect(() => {
    if (!searchCompanybyText) {
      SetFilterCompany(allCompany);
    } else {
      const filtered = allCompany.filter((company) =>
        company?.name?.toLowerCase().includes(searchCompanybyText.toLowerCase())
      );
      SetFilterCompany(filtered);
    }
  }, [allCompany, searchCompanybyText]);

  //Delete Company Function
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(ROUTES.DELETE_COMPANY(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Company deleted successfully");
        dispatch(removeCompanyById(id));
        setOpenPopoverId(null);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete company";
      toast.error(message);
      console.error("Delete failed:", message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List Of Company</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex items-center justify-center h-20">
                  <span className="text-center text-red-600 font-bold">
                    No Company Registered
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterCompany.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={item.logo || "/default-logo.png"}
                        alt={item.name}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.createdAt.replace(/T.*/, "")}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover
                      open={openPopoverId === item._id}
                      onOpenChange={(open) =>
                        setOpenPopoverId(open ? item._id : null)
                      }
                    >
                      <PopoverTrigger>
                        <MoreHorizontalIcon />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto h-auto rounded-2xl shadow-xl border border-gray-300">
                        <div className="flex flex-col justify-center space-x-2 gap-2">
                          <div className="mx-2 flex items-center justify-around">
                            <Button
                              variant="ghost"
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/admin/companies/${item._id}`)
                              }
                            >
                              <span className="font-medium">Edit</span>
                              <Edit2 className="my-2 w-4 text-black" />
                            </Button>
                          </div>
                          <div className="mx-2 flex items-center justify-around">
                            <Button
                              variant="ghost"
                              className="cursor-pointer"
                              onClick={() => {
                                handleDelete(item._id);
                              }}
                            >
                              <span className="font-medium">Delete</span>
                              <Trash2 className="my-2 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
