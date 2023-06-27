import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const links = [
    { value: "Students", redirect: "/admin/searchstudent" },
    { value: "Course Registeration", redirect: "/admin/home" },
    { value: "Subjects", redirect: "/admin/subjects" },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        className="my-auto text-lg font-semibold text-white hover:text-gray-200 duration-500"
        to={link.redirect}
      >
        {link.value}
      </Link>
    );
  });

  return (
    <div className="flex justify-between p-4 bg-[#9381ff]">
      <h1 className="font-semibold text-2xl text-white text-[#f8f7ff] my-auto">
        Delhi Technological University
      </h1>
      <div className="flex gap-4">
        {renderedLinks}
        <div className="flex gap-2">
          <div className="bg-gray-100 py-1 px-2 rounded-lg hover:scale-105 cursor-pointer duration-500">
            Ayush Gupta
          </div>
          <div className="bg-red-500 py-1 px-2 rounded-lg text-white hover:scale-105 duration-500 cursor-pointer">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
