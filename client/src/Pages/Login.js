import React from "react";
import InputField from "../Components/InputField";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen h-full bg-[#f8f7ff] flex">
      <div className="bg-[#ffeedd] m-auto py-8 px-12 w-1/2 md:w-1/3 drop-shadow-lg">
        <h1 className="font-semibold text-3xl">Login</h1>
        <InputField label="Username" type="text" required></InputField>
        <InputField label="Password" type="password" requried></InputField>
        <button className="p-2 w-full bg-[#ffd8be] my-2 hover:scale-105 duration-500 cursor-pointer">
          Submit
        </button>
        <a
          className="p-2 flex gap-4 w-full bg-white justify-center text-md cursor-pointer hover:scale-105 duration-500 hover:bg-gray-100 mt-2"
          href="http://localhost:80/auth"
        >
          <FcGoogle className="my-auto"></FcGoogle>
          <h3 className="my-auto">Login with Google</h3>
        </a>
        <Link
          to="/admin/login"
          className="mt-4 hover:text-blue-500 cursor-pointer duration-500"
        >
          Not a student?
        </Link>
      </div>
    </div>
  );
}

export default Login;
