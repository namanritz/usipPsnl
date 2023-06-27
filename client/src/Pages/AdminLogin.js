import React, { useState } from "react";
import InputField from "../Components/InputField";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function AdminLogin() {
  const [empID, setEmpID] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    login(dispatch, { empID, password });
  };

  console.log(empID, password);

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff] flex">
      <div className="bg-[#ffeedd] m-auto py-8 px-12 w-1/2 md:w-1/3 drop-shadow-lg">
        <h1 className="font-semibold text-3xl">Admin Login</h1>
        <InputField
          label="Employee ID"
          type="text"
          required
          onChange={setEmpID}
        ></InputField>
        <InputField
          label="Password"
          type="password"
          requried
          onChange={setPassword}
        ></InputField>
        <button
          className="p-2 w-full bg-[#ffd8be] my-2 hover:scale-105 duration-500 cursor-pointer"
          onClick={handleClick}
        >
          Submit
        </button>
        <div className="mt-4 hover:text-blue-500 cursor-pointer duration-500">
          Not a student?
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
