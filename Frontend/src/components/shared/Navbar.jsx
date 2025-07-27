import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { PATH } from "@/utils/constant";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm  top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-10 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="font-bold text-2xl">
            Job<span className="text-red-500">Hunt</span>
          </h1>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to={PATH.HOME}>Home</Link></li>
            <li><Link to={PATH.JOBS}>Jobs</Link></li>
            <li><Link to={PATH.BROWSER}>Browser</Link></li>
           {user?.role === 'admin' && (
  <li>
    <Link to={PATH.ADMIN_DASHBOARD}>Admin</Link>
  </li>
)}

          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={PATH.LOGIN}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={PATH.SIGNUP}>
                <Button className="bg-red-500 hover:bg-red-600">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile?.profilePhoto} className="w-full" />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mx-2 border border-gray-400 shadow-xl">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={user.profile?.profilePhoto} className="w-full" />
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col mx-2">
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={() => dispatch(logout())}>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-medium">
            <li><Link to={PATH.HOME} onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to={PATH.JOBS} onClick={() => setMenuOpen(false)}>Jobs</Link></li>
            <li><Link to={PATH.BROWSER} onClick={() => setMenuOpen(false)}>Browser</Link></li>
            <li><Link to={PATH.ADMIN_DASHBOARD} onClick={() => setMenuOpen(false)}>Admin</Link></li>
          </ul>
          <div className="mt-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to={PATH.LOGIN}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to={PATH.SIGNUP}>
                  <Button className="w-full bg-red-500 hover:bg-red-600">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-gray-600 mt-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.profile?.profilePhoto} />
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link to={PATH.PROFILE}>
                  <Button variant="link" className="w-full justify-start">
                    <User2 className="mr-2" /> View Profile
                  </Button>
                </Link>
                <Button
                  variant="link"
                  className="w-full justify-start text-red-500"
                  onClick={() => dispatch(logout())}
                >
                  <LogOut className="mr-2" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
