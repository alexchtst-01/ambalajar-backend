import express from "express";
import { AuthenTeacher, AuthenUser } from "../middleware/authentication.js";
import {
  getAllCourse,
  getCourseByID,
  getStudentCourseSummary,
  getStudentCourseSummarybyID,
  getStudentsCourse,
  studentTakeCourse,
} from "../controller/CourseController.js";

const CourseRoutes = express.Router();

// untuk page [http://localhost:5173/courses] [student]
CourseRoutes.get("/in-course", AuthenUser, getStudentsCourse);
CourseRoutes.post("/take-course", AuthenUser, studentTakeCourse);

// untuk page [http://localhost:5173/courses] [techer]
CourseRoutes.get("/allcourse", AuthenTeacher, getAllCourse);
CourseRoutes.get("/specific-course/:id", AuthenTeacher, getCourseByID);

// untuk page [http://localhost:5173/course]
CourseRoutes.get("/summary-course", AuthenUser, getStudentCourseSummary); // kayanya ga kepake deh yang ini soalnya yang kepake single course data reitrive aja
CourseRoutes.get("/course/:id", AuthenUser, getStudentCourseSummarybyID);

export default CourseRoutes;
