import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

function CoursesPage() {
  const [courses, setCourses] = useState([]); // state and setter

  useEffect(() => {
    getCourses().then((_courses) => setCourses(_courses));
  }, []); //dependency array - don't forget this

  return (
    <>
      <h2>Courses</h2>
      <CourseList courses={courses} />{" "}
      {/* CourseList is presentation component, {courses} is props */}
    </>
  );
}

export default CoursesPage;
