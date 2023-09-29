import React from "react";
import { Link } from "react-router-dom";
import FoodList from "../components/FoodList";

const Food = () => {
  return (
    <>
      <div className="container mx-auto my-8">
        <h1 className="text-xl text-[#d7d7d7] mb-8">
          Tambahkan menu makanan yang ada di resto
        </h1>
        <div className="w-full bg-white p-16">
          <Link
            to="/tambah-menu"
            className="bg-[#00acef] rounded-md px-4 py-2 text-lg font-semibold text-white"
          >
            + Tambah menu
          </Link>
          <FoodList />
        </div>
      </div>
    </>
  );
};

export default Food;
