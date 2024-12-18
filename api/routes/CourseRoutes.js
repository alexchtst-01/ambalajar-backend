import express from "express";
import { AuthenUser } from "../middleware/authentication.js";
import {
  getStudentCourseSummary,
  getStudentCourseSummarybyID,
  getStudentsCourse,
  studentTakeCourse,
} from "../controller/StudentCourseController.js";

const CourseRoutes = express.Router();

// untuk page [http://localhost:5173/courses] [student]
CourseRoutes.get("/in-course", AuthenUser, getStudentsCourse);
CourseRoutes.post("/take-course", AuthenUser, studentTakeCourse);

// untuk page [http://localhost:5173/courses] [techer]


// untuk page [http://localhost:5173/course]
CourseRoutes.get("/summary-course", AuthenUser, getStudentCourseSummary); // kayanya ga kepake deh yang ini soalnya yang kepake single course data reitrive aja
CourseRoutes.get("/course/:id", AuthenUser, getStudentCourseSummarybyID);

export default CourseRoutes;
