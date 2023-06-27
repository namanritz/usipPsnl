import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import MaterialTable from "../Components/Table";
import Button from "../Components/Button";

function EditCourse() {
  const user = useSelector((state) => state.currentUser);
  console.log(user);
  const [foundCourse, setFoundCourse] = useState({});
  const [subjects, setSubjects] = useState([]);
  const url = window.location.pathname.split("/")[3];

  let isOpen = <h3 className="font-semibold text-3xl my-auto">No</h3>;

  if (foundCourse.open) {
    isOpen = <h3 className="font-semibold text-3xl my-auto">Yes</h3>;
  }

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:80/admin/cr/${url}`, {
          headers: { token: `Bearer ${user.token}` },
        });
        setFoundCourse(res.data.cr);
        setSubjects(res.data.foundSubjects);
      } catch (err) {
        console.log(err);
      }
    };
    getCourse();
  }, []);

  let contentTable;

  if (subjects[0]) {
    contentTable = (
      <MaterialTable
        data={subjects}
        cols={Object.keys(subjects[0])}
      ></MaterialTable>
    );
  }

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="h-full w-full p-4 flex flex-col">
        <h1 className="w-full text-center my-4 text-2xl font-semibold">
          Edit Course
        </h1>
        <div className="block md:flex gap-4 mx-auto">
          <div className="flex gap-2">
            <h3 className="font-semibold text-3xl my-auto text-gray-500">
              Aprog:{" "}
            </h3>
            <h3 className="font-semibold text-3xl my-auto">
              {foundCourse.aprog}
            </h3>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-3xl my-auto text-gray-500">
              Year:{" "}
            </h3>
            <h3 className="font-semibold text-3xl my-auto">
              {foundCourse.year}
            </h3>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-3xl my-auto text-gray-500">
              Semester:{" "}
            </h3>
            <h3 className="font-semibold text-3xl my-auto">
              {foundCourse.sem}
            </h3>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-3xl my-auto text-gray-500">
              Open
            </h3>
            {isOpen}
          </div>
        </div>
        <div className="w-full md:w-2/3 rounded-lg bg-white mx-auto flex my-6 p-4">
          <form className="mx-auto grid grid-cols-2 gap-4">
            <div className="flex gap-2 col-span-2 md:col-span-1">
              <div className="font-semibold text-xl my-auto text-gray-500">
                Set Open
              </div>
              <select className="font-semibold rounded-lg bg-gray-50 border-2 border-gray-500 p-2 text-xl cursor-pointer">
                <option>TRUE</option>
                <option>FALSE</option>
              </select>
            </div>
            <div className="flex gap-2 col-span-2 md:col-span-1">
              <div className="font-semibold text-xl my-auto text-gray-500">
                ODD/EVEN
              </div>
              <select className="font-semibold rounded-lg bg-gray-50 border-2 border-gray-500 p-2 text-xl cursor-pointer">
                <option>ODD</option>
                <option>EVEN</option>
              </select>
            </div>
            <div className="flex gap-2 col-span-2">
              <div className="font-semibold text-xl my-auto text-gray-500">
                Duration (Year-Year(Month-Month))
              </div>
              <input className="font-semibold rounded-lg bg-gray-50 border-2 border-gray-500 p-2 text-xl"></input>
            </div>
            <div className="flex gap-2 col-span-2 md:col-span-1">
              <div className="font-semibold text-xl my-auto text-gray-500">
                Max Credits
              </div>
              <input className="font-semibold rounded-lg bg-gray-50 border-2 border-gray-500 p-2 text-xl"></input>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold text-xl my-auto text-gray-500">
                Max Electives
              </div>
              <input className="font-semibold rounded-lg bg-gray-50 border-2 border-gray-500 p-2 text-xl"></input>
            </div>
            <div className="mx-auto col-span-2 w-full">
              <Button bgPurple wide>
                Submit
              </Button>
            </div>
          </form>
        </div>
        {contentTable}
      </div>
    </div>
  );
}

export default EditCourse;
