import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import classNames from "classnames";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import { AiOutlinePlus } from "react-icons/ai";

function Spl() {
  const [spl, setSpl] = useState([]);
  const [selectedSpl, setSelectedSpl] = useState({});
  const [newForm, setNewForm] = useState(false);

  useEffect(() => {
    const getSpecializations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:80/admin/defineSpecializations"
        );
        setSpl(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getSpecializations();
  }, []);
  console.log("selected", Object.keys(selectedSpl).length);

  const handleSelectSpl = (object) => {
    console.log(object);
    if (Object.keys(selectedSpl).length !== 0) {
      setSelectedSpl({});
    } else {
      setSelectedSpl(object);
    }
  };

  const renderedSpl = spl.map((object) => {
    const splClasses = classNames({
      "font-semibold": true,
      "text-lg": true,
      "cursor-pointer": true,
      "hover:bg-gray-200": true,
      "hover:scale-105": true,
      "duration-500": true,
      "p-2": true,
      "rounded-lg": true,
      "bg-gray-200": object === selectedSpl,
      "scale-105": object === selectedSpl,
    });
    return (
      <div
        onClick={() => {
          handleSelectSpl(object);
        }}
        className={splClasses}
      >
        {object.sp_code}
      </div>
    );
  });

  const fields = Object.keys(selectedSpl);

  const renderedFields = fields.map((field) => {
    if (field !== "_id" && field !== "__v") {
      return (
        <InputField
          label={field}
          type="text"
          defaultValue={selectedSpl[field]}
        ></InputField>
      );
    }
  });

  let button;
  if (Object.keys(selectedSpl).length > 0) {
    button = (
      <Button bgPurple rounded wide>
        Submit
      </Button>
    );
  }

  const formFields = [
    { label: "Specialization Code" },
    { label: "Specialization Name" },
    { label: "Start Year" },
    { label: "Department Code" },
    { label: "Hindi Name" },
    { label: "Campus" },
  ];

  const renderedFormFields = formFields.map((formField) => {
    return (
      <InputField
        label={formField.label}
        required={true}
        type="text"
      ></InputField>
    );
  });

  let form;
  if (newForm) {
    form = (
      <form className="w-full">
        {renderedFormFields}{" "}
        <div className="w-full flex">
          <div className="w-fit mx-auto">
            <Button bgPurple rounded>
              Submit
            </Button>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="h-full w-full p-10">
        <button
          onClick={() => {
            setNewForm(!newForm);
          }}
          className="flex mx-auto mb-2 mt-8 bg-[#9381ff] p-2 font-semibold text-white rounded-lg hover:scale-105 cursor-pointer hover:bg-white duration-500 hover:text-[#9381ff]"
        >
          <AiOutlinePlus className="mr-1 my-auto"></AiOutlinePlus>
          <div>Add New Specialization</div>
        </button>
        {form}
        <div className="h-screen w-full flex border-2 p-2">
          <div className="w-1/3 overflow-y-scroll bg-gray-100 p-2">
            {renderedSpl}
          </div>
          <div className="w-2/3 p-4 ">
            {renderedFields}
            {button}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spl;
