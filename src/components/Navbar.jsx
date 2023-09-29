import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigation = [
    { name: "Food", to: "/" },
    { name: "Transaksi", to: "/transaksi" },
  ];

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="bg-white my-2">
      <div className="container mx-auto ">
        <div className=" w-[19vw] -ml-[1vw] flex justify-between">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              exact={item.exact}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "transition duration-300 border-b-2 border-[#0eabef] text-[#0eabef]"
                    : "",
                  "text-2xl font-semibold w-[10vw] ml-[1vw] pb-[0.5vh] flex justify-center "
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
