import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

function CourseRegistration() {
  const [crRules, setCrRules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    const getCrRules = async () => {
      const res = await axios.get(
        "http://localhost:80/admin/courseRegisteration",
        { headers: { token: `Bearer ${user.token}` } }
      );
      setCrRules(res.data);
    };
    const getCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:80/admin/defineprograms",
          { headers: { token: `Bearer ${user.token}` } }
        );
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();
    getCrRules();
  }, []);

  const handleDelete = async (cr) => {
    console.log("to delete", cr);
    try {
      const res = await axios.post(
        `http://localhost:80/admin/cr/delete/${cr._id}`,
        { headers: { token: `Bearer ${user.token}` } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(crRules);
  const renderedCrs = crRules.map((cr) => {
    console.log(cr.open);
    let open;
    if (cr.open) {
      open = "Yes";
    } else {
      open = "No";
    }
    return (
      <Link to={`/admin/courseregistration/${cr._id}`}>
        <div
          className="p-4 w-fit h-fit shadow-lg bg-white rounded-lg text-lg cursor-pointer hover:bg-gray-100 hover:scale-105 duration-500"
          key={cr._id}
        >
          <div className="flex w-full justify-end mb-4 text-red-500">
            <AiFillDelete
              size={25}
              className="cursor-pointer hover:scale-105 duration-500"
              onClick={() => {
                handleDelete(cr);
              }}
            ></AiFillDelete>
          </div>
          <div className="flex gap-2">
            <h1 className="text-gray-600">ID</h1>
            <h1 className="text-gray-600 font-semibold">{cr._id}</h1>
          </div>
          <div className="flex gap-2">
            <h1 className="text-gray-600">Year</h1>
            <h1 className="text-gray-600 font-semibold">{cr.year}</h1>
          </div>
          <div className="flex gap-2">
            <h1 className="text-gray-600">Program</h1>
            <h1 className="text-gray-600 font-semibold">{cr.aprog}</h1>
          </div>
          <div className="flex gap-2">
            <h1 className="text-gray-600">Semester</h1>
            <h1 className="text-gray-600 font-semibold">{cr.sem}</h1>
          </div>
          <div className="flex gap-2">
            <h1 className="text-gray-600">Open</h1>
            <h1 className="text-gray-600 font-semibold">{open}</h1>
          </div>
        </div>
      </Link>
    );
  });
  const d = new Date();
  const currentYear = d.getFullYear();

  const sem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderedSem = sem.map((s) => {
    return (
      <option className="w-fit" key={s}>
        {s}
      </option>
    );
  });

  let renderedNumbers = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const renderedYears = renderedNumbers.map((r) => {
    return <option key={r + currentYear}>{r + currentYear}</option>;
  });
  const renderedProg = courses.map((course) => {
    return (
      <option key={course.aprog} className="w-fit">
        {course.aprog}
      </option>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    for (let i = 0; i < e.target.length; i++) {
      formData[e.target[i].name] = e.target[i].value;
    }
    delete formData[""];
    console.log(formData);
    try {
      const res = axios.post("http://localhost:80/admin/createCR", formData, {
        headers: { token: `Bearer ${user.token}` },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  let newRuleForm = (
    <form
      className="bg-gray-100 w-1/2 rounded-lg p-4 mx-auto my-6"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className=" flex gap-2 justify-between">
        <div className="flex flex-col my-4">
          <label className="mb-2 text-lg text-gray-500" htmlFor="year">
            Batch Year
          </label>
          <select
            name="year"
            id="year"
            className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"
          >
            {renderedYears}
          </select>
        </div>
        <div className="flex flex-col my-4">
          <label className="mb-2 text-lg text-gray-500" htmlFor="aprog">
            Program
          </label>
          <select
            name="aprog"
            id="aprog"
            className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"
          >
            {renderedProg}
          </select>
        </div>
        <div className="flex flex-col my-4">
          <label className="mb-2 text-lg text-gray-500" htmlFor="sem">
            Semester
          </label>
          <select
            name="sem"
            id="sem"
            className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"
          >
            {renderedSem}
          </select>
        </div>
      </div>
      <Button bgPurple wide>
        Submit
      </Button>
    </form>
  );

  let visibleForm = <div></div>;
  if (isVisible) {
    visibleForm = newRuleForm;
  }

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="h-full w-full p-4">
        <h1 className="w-full text-center my-4 text-2xl font-semibold">
          Course Registration
        </h1>
        <div className="flex justify-center w-full my-4">
          <Button
            bgPurple
            center
            handleClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            Create new rule
          </Button>
        </div>
        {visibleForm}

        <div className="w-full h-full">
          <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderedCrs}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
