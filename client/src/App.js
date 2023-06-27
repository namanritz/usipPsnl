import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StudentHome from "./Pages/StudentHome";
import AdminHome from "./Pages/AdminHome";
import SearchStudent from "./Pages/SearchStudent";
import AdminLogin from "./Pages/AdminLogin";
import Subjects from "./Pages/Subjects";
import DefinePrograms from "./Pages/DefinePrograms";
import Spl from "./Pages/Spl";
import HomeSections from "./Pages/HomeSections";
import CourseSections from "./Pages/CourseSections";
import CourseRegistration from "./Pages/CourseRegistration";
import EditCourse from "./Pages/EditCourse";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="student/home"
            element={<StudentHome></StudentHome>}
          ></Route>
          <Route path="admin/home" element={<AdminHome></AdminHome>}></Route>
          <Route
            path="/admin/searchstudent"
            element={<SearchStudent></SearchStudent>}
          ></Route>
          <Route
            path="/admin/login"
            element={<AdminLogin></AdminLogin>}
          ></Route>
          <Route path="/admin/subjects" element={<Subjects></Subjects>}></Route>
          <Route
            path="/admin/defineprograms"
            element={<DefinePrograms></DefinePrograms>}
          ></Route>
          <Route path="/admin/specializations" element={<Spl></Spl>}></Route>
          <Route
            path="/admin/homesections"
            element={<HomeSections></HomeSections>}
          ></Route>
          <Route
            path="/admin/coursesections"
            element={<CourseSections></CourseSections>}
          ></Route>
          <Route
            path="/admin/courseregistration"
            element={<CourseRegistration></CourseRegistration>}
          ></Route>
          <Route
            path="/admin/courseregistration/:id"
            element={<EditCourse></EditCourse>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
