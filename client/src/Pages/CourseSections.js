import React from "react";
import Navbar from "../Components/Navbar";

function CourseSections() {
  const d = new Date();
  const currentYear = d.getFullYear();

  let renderedNumbers = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const renderedYears = renderedNumbers.map((r) => {
    return <option>{r + currentYear}</option>;
  });

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="h-full w-full p-4">
        <h1 className="w-full text-center my-4 text-2xl font-semibold">
          Assign Course Sections
        </h1>
        <div className="block md:flex gap-4 w-full">
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Course: </h3>
            <select className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"></select>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Batch Year:</h3>
            <select className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit">
              {renderedYears}
            </select>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Student Count: </h3>
            <div className="font-semibold text-lg my-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSections;
