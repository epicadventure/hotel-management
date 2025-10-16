import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to='/'>
        <img src={assets.logo} alt="logo" className="h-9  opacity-80" />
      </Link>
      <Link
        to="/"
        className="hidden md:flex items-center gap-4 lg:gap-8 hover:underline text-gray-700 font-medium"
      >
        Home
      </Link>
      <UserButton />
    </div>
  );
};

export default Navbar;
