import React from "react";
import Navbar from "../Components/Navbar";
import { AiOutlineBook } from "react-icons/ai";
import { GoBeaker } from "react-icons/go";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaDivide } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminHome() {
  const options = [
    {
      value: "Define Programs",
      icon: <AiOutlineBook></AiOutlineBook>,
      redirect: "/admin/defineprograms",
    },
    {
      value: "Define Specializations",
      redirect: "/admin/specializations",
      icon: <GoBeaker></GoBeaker>,
    },
    {
      value: "Course Registeration Info",
      icon: <BsFillPeopleFill></BsFillPeopleFill>,
      redirect: "/admin/courseregistration",
    },
    {
      value: "Home Sectioning",
      icon: <FaDivide></FaDivide>,
      redirect: "/admin/homesections",
    },
    {
      value: "Course Sectioning",
      icon: <FaDivide></FaDivide>,
      redirect: "/admin/coursesections",
    },
  ];

  const renderedOptions = options.map((option) => {
    return (
      <Link
        className="flex flex-col w-full p-4 bg-gray-200 rounded-lg shadow-lg py-10 cursor-pointer hover:bg-gray-300 duration-500 hover:scale-105"
        to={option.redirect}
      >
        <div className="w-fit mx-auto text-4xl">{option.icon}</div>
        <div className="w-fit mx-auto text-xl">{option.value}</div>
      </Link>
    );
  });

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="flex h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto my-20">
          {renderedOptions}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
