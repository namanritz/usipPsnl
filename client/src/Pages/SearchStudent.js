import React, { useState } from "react";
import FieldValue from "../Components/FieldValue";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";

function SearchStudent() {
  const [rollNo, setRollNo] = useState("");
  const [foundStudent, setFoundStudent] = useState({});
  const user = useSelector((state) => state.currentUser);
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:80/admin/students",
        {
          roll_no: rollNo,
        },
        { headers: { token: `Bearer ${user.token}` } }
      );
      setFoundStudent(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const keys = Object.keys(foundStudent);

  const renderedInfo = keys.map((key) => {
    return <FieldValue field={key} value={foundStudent[key]}></FieldValue>;
  });

  let studentPane;
  if (keys.length > 0) {
    studentPane = (
      <div className="w-full h-full border-2 mt-6 grid grid-rows-2 sm:grid-cols-2 gap-2 p-4 bg-white shadow-lg">
        {renderedInfo}
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="w-full h-full p-6">
        <div className="w-full flex flex-col">
          <div className="text-2xl font-semibold text-gray-500 mb-4">
            Enter Roll Number
          </div>
          <input
            className="w-1/2 p-2 text-xl text-gray-500 focus:outline-none rounded-lg"
            onChange={(e) => {
              setRollNo(e.target.value);
            }}
            placeholder="Example: 2K21/EE/85"
          ></input>
          <button
            onClick={() => {
              handleClick();
            }}
            className="text-left mt-4 bg-[#b8b8ff] p-2 w-fit px-6 font-semibold text-lg rounded-lg shadow-lg cursor-pointer hover:scale-105 duration-500"
          >
            Search
          </button>
          {studentPane}
        </div>
      </div>
    </div>
  );
}

export default SearchStudent;
