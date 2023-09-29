import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiRestaurantFill } from "react-icons/ri";
import Navbar from "./Navbar";

const DefaultLayout = () => {
  return (
    <>
      <div className="bg-[#00acee] py-2">
        <header className="container mx-auto">
          <h1 className="text-4xl">
            <Link to="/" className="flex items-center text-white">
              <RiRestaurantFill className="mr-4" />
              Alan Resto
            </Link>
          </h1>
        </header>
      </div>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
