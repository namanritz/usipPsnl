import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import axios from "axios";
import classNames from "classnames";
import { AiOutlinePlus } from "react-icons/ai";
import InputField from "../Components/InputField";

function DefinePrograms() {
  const user = useSelector((state) => state.currentUser);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newForm, setNewForm] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleClick = (index) => {
    if (
      selectedCourse === index ||
      (selectedCourse !== null && selectedCourse !== index)
    ) {
      setSelectedCourse(null);
    } else if (selectedCourse === null) {
      setSelectedCourse(index);
    }
  };

  const renderedCourses = courses.map((course, index) => {
    const classes = classNames({
      "my-2": true,
      "duration-500": true,
      "p-4": true,
      "rounded-lg": true,
      "bg-gray-100": true,
      "bg-gray-300": index === selectedCourse,
      "font-semibold": true,
      "text-lg": true,
      "text-center": true,
      "shadow-xl": true,
      "hover:bg-gray-300": true,
      "cursor-pointer": true,
      "hover:scale-110": true,
      "scale-110": index === selectedCourse,
    });
    return (
      <div
        className={classes}
        onClick={() => {
          handleClick(index);
        }}
      >
        {course.aprog}
      </div>
    );
  });

  let renderedInfo;

  if (selectedCourse) {
    const keys = Object.keys(courses[selectedCourse]);

    renderedInfo = keys.map((key) => {
      if (key !== "_id" && key !== "__v")
        if (
          key == "duration_max" ||
          key == "duration_min" ||
          key == "num_stages" ||
          key == "min_credits"
        ) {
          return (
            <InputField
              type="number"
              label={key}
              id={key}
              defaultValue={courses[selectedCourse][key]}
            ></InputField>
          );
        } else if (key != "__v")
          return (
            <InputField
              type="text"
              label={key}
              id={key}
              defaultValue={courses[selectedCourse][key]}
            ></InputField>
          );
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {};

    for (let i = 0; i < e.target.length; i++) {
      formData[e.target[i].id] = e.target[i].value;
    }
    console.log(formData);

    try {
      const res = await axios.put(
        "http://localhost:80/admin/updateProgram",
        formData
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  let content;
  if (selectedCourse) {
    content = (
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {renderedInfo}
        <button className="col-span-2 flex mx-auto mt-1 bg-[#9381ff] p-2 px-6 font-semibold text-white rounded-lg hover:scale-105 cursor-pointer duration-500">
          <div>Submit</div>
        </button>
      </form>
    );
  }

  let newProgramForm;
  if (newForm) {
    newProgramForm = (
      <div className="mx-auto">
        <form className="grid grid-cols-2 md:grid-cols-3 w-full gap-4 rounded-lg bg-gray-100 p-4 mt-2 px-6">
          <InputField label="id" id="id" type="text"></InputField>
          <InputField
            label="Program Abbreviation"
            id="aprog"
            type="text"
          ></InputField>
          <InputField label="Name" id="name" type="text"></InputField>
          <InputField
            label="Start Year"
            id="start_year"
            type="text"
          ></InputField>
          <InputField
            label="Parent Program Abbreviation"
            id="aprog_prnt"
            type="text"
          ></InputField>
          <InputField
            label="Program in Hindi"
            id="aproghindi"
            type="text"
          ></InputField>
          <InputField
            label="Degree Hindi Name"
            id="degreehindiname"
            type="text"
          ></InputField>
          <InputField
            label="Degree Name"
            id="degreename"
            type="text"
          ></InputField>
          <InputField
            label="Duration (max)"
            id="duration_max"
            type="number"
          ></InputField>
          <InputField
            label="Duration (min)"
            id="duration_min"
            type="number"
          ></InputField>
          <InputField
            label="Number of Stages"
            id="num_stages"
            type="number"
          ></InputField>
          <InputField
            label="Minimum Credits"
            id="min_credits"
            type="number"
          ></InputField>
          <button className="col-span-2 md:col-span-3 flex mx-auto bg-[#9381ff] p-2 font-semibold text-white rounded-lg hover:scale-105 cursor-pointer hover:bg-white duration-500 hover:text-[#9381ff]">
            <div>Submit</div>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="w-full">
        <div className="flex w-full">
          <button
            onClick={() => {
              setNewForm(!newForm);
            }}
            className="flex mx-auto mt-8 bg-[#9381ff] p-2 font-semibold text-white rounded-lg hover:scale-105 cursor-pointer hover:bg-white duration-500 hover:text-[#9381ff]"
          >
            <AiOutlinePlus className="my-auto mr-1"></AiOutlinePlus>
            <div>Add New Course</div>
          </button>
        </div>
        <div className="w-full flex">{newProgramForm}</div>

        <div className="mx-auto p-10 grid grid-cols-5 gap-6 w-2/3">
          {renderedCourses}
        </div>
        <div className="flex w-full">
          <div className="w-2/3 p-10 mx-auto">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default DefinePrograms;
