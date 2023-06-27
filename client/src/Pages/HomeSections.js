import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import axios from "axios";

function HomeSections() {
  const sectionNames = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [program, setProgram] = useState("");
  const [courses, setCourses] = useState([]);
  const [spl, setSpl] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSpl, setSelectedSpl] = useState("");
  const [sections, setSections] = useState(1);
  const [groups, setGroups] = useState(1);
  const [studentsPerSections, setStudentsPerSection] = useState([]);

  const user = useSelector((state) => state.currentUser);

  const d = new Date();
  const currentYear = d.getFullYear();
  const [batchYear, setBatchYear] = useState(currentYear);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get("http://localhost:80/admin/count", {
          params: {
            batch_year: batchYear,
            sp_code: selectedSpl,
            aprog: program,
          },
        });
        console.log(res.data);
        setStudents(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getStudents();
  }, [selectedSpl, batchYear, program]);

  useEffect(() => {
    const getSpecializations = async () => {
      console.log(program);
      try {
        const res = await axios.get("http://localhost:80/admin/programs", {
          params: { aprog: program },
        });
        setSpl(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getSpecializations();
  }, [program]);

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
  const renderedProg = courses.map((course) => {
    return <option className="w-fit">{course.aprog}</option>;
  });
  const renderedSpl = spl.map((s) => {
    return <option className="w-fit">{s.sp_code}</option>;
  });
  let renderedNumbers = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const renderedYears = renderedNumbers.map((number) => {
    return (
      <option
        onClick={() => {
          setBatchYear(number + currentYear);
        }}
      >
        {number + currentYear}
      </option>
    );
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:80/admin/homesection", {
        totalStudents: students.length,
        sections: sections,
        groups: groups,
      });
      console.log(res.data);
      setStudentsPerSection(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  let studentsIds = students.map((s) => s._id);
  async function handleFinal() {
    try {
      const res = await axios.post(
        "http://localhost:80/admin/homesectionallotment",
        {
          year: batchYear,
          aprog: program,
          sp_code: selectedSpl,
          groupNumber: groups,
          studentsPerSections: studentsPerSections,
          students: studentsIds,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const renderedSections = studentsPerSections.map((section, index) => {
    const renderedGroups = section.map((group, indexGroup) => {
      return (
        <li className="flex gap-2 text-center gap-4 my-6 text-lg">
          <h3 className="font-semibold text-gray-500">P-{indexGroup + 1}</h3>
          <div>{section[indexGroup]}</div>
        </li>
      );
    });
    return (
      <div className="bg-gray-100 px-2 rounded-lg border-2 p-2 px-6 text-center shadow-lg">
        <h1 className="font-semibold text-xl text-[#9381ff]">
          {selectedSpl}-{sectionNames[index % 25]}
        </h1>
        <ul>{renderedGroups}</ul>
      </div>
    );
  });

  return (
    <div className="min-h-screen h-full bg-[#f8f7ff]">
      <Navbar></Navbar>
      <div className="h-full w-full p-4">
        <h1 className="w-full text-center my-4 text-2xl font-semibold">
          Assign Home Sections
        </h1>
        <div className="block md:flex gap-4 w-full ">
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Program: </h3>
            <select
              onChange={(e) => {
                setProgram(e.target.value);
              }}
              className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"
            >
              {renderedProg}
            </select>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Discipline: </h3>

            <select
              onChange={(e) => {
                setSelectedSpl(e.target.value);
              }}
              className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"
            >
              {renderedSpl}
            </select>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Batch Year: </h3>
            <select
              onChange={(e) => {
                setBatchYear(e.target.value);
              }}
              className="border-gray-500 border-2 rounded-lg p-2 bg-gray-100 cursor-pointer max-w-fit"
            >
              {renderedYears}
            </select>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Student Count: </h3>
            <div className="font-semibold text-lg my-auto">
              {students.length}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4 my-4">
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Sections</h3>
            <input
              type="number"
              min={1}
              max={999}
              defaultValue={1}
              className="font-semibold text-lg text-gray-600 focus:outline-none border-2 border-gray-500 rounded-lg p-1 bg-gray-100 h-fit my-auto"
              onChange={(e) => {
                setSections(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold text-xl my-auto">Groups</h3>
            <input
              type="number"
              min={1}
              max={999}
              defaultValue={1}
              className="font-semibold text-lg text-gray-600 focus:outline-none border-2 border-gray-500 rounded-lg p-1 bg-gray-100 h-fit my-auto"
              onChange={(e) => {
                setGroups(e.target.value);
              }}
            ></input>
          </div>
          <Button handleClick={handleSubmit} bgPurple>
            Run Algorithm
          </Button>
        </div>
        <div className="w-full flex">
          <div className="flex gap-4 mx-auto">{renderedSections}</div>
        </div>
        <div className="w-full flex my-6">
          <div className="mx-auto">
            <Button bgPurple handleClick={handleFinal}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSections;
