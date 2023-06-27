import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MaterialTable from "../Components/Table";
import axios from "axios";

function Subjects() {
  const [subjects, setSubjects] = useState([{ id: 1 }]);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:80/admin/subjects");
        setSubjects(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubjects();
  }, []);

  console.log(subjects);

  //   console.log(Object.keys(subjects[0]));

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="w-full h-full p-4">
        <MaterialTable
          cols={Object.keys(subjects[0])}
          data={subjects}
        ></MaterialTable>
      </div>
    </div>
  );
}

export default Subjects;
