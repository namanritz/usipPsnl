import React from "react";
import Navbar from "../Components/Navbar";
import avatar from "../Assets/studentAvatar.png";
import FieldValue from "../Components/FieldValue";

function StudentHome() {
  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="h-full w-full flex">
        <div className="p-4 md:min-h-screen md:h-full bg-gray-200 md:w-1/4 w-full">
          <img src={avatar} className="h-[200px] mx-auto"></img>
          <h3 className="my-auto w-full text-center font-semibold text-xl">
            Ayush Gupta
          </h3>
          <div className="text-center text-lg text-gray-500">B.Tech.</div>
          <div className="text-center text-lg text-gray-500">
            Electrical Engineering
          </div>
          <div className="flex flex-col mt-6 gap-2 md:mx-4">
            <FieldValue
              field="Email"
              value="ayush.gupta2002@gmail.com"
            ></FieldValue>
            <FieldValue field="Phone" value="1234567890"></FieldValue>
            <FieldValue field="Adhaar Number" value="1234567890"></FieldValue>
            <FieldValue field="Father Name" value="Kailash Gupta"></FieldValue>
            <FieldValue
              field="Address"
              value="Manhattan, New York"
            ></FieldValue>
            <FieldValue field="Postal Code" value="123456"></FieldValue>
            <FieldValue field="Nationality" value="Indian"></FieldValue>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
