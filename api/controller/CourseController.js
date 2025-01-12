import Course from "../models/sql/Course.js";
import Material from "../models/sql/Material.js";
import Assignment from "../models/sql/Assignment.js";
import Quiz from "../models/sql/Quiz.js";
import StudentCourse from "../models/sql/StudentEnteredCourse.js";
import { Op } from "sequelize";

export const getStudentCourseSummary = async (req, res) => {
  try {
    const courses = await StudentCourse.findAll({
      where: { studentId: req.userId },
      attributes: ["progress"],
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["courseId", "name"],
          include: [
            { model: Material, as: "material" },
            { model: Assignment, as: "assignments" },
            { model: Quiz, as: "quiz" },
          ],
        },
      ],
    });
    if (courses.length < 1) {
      return res.status(200).json({
        msg: "belum ada course",
        data: {
          courses,
        },
      });
    }
    return res.status(200).json({
      msg: `berhasil meretrieve data sebanyak ${courses.length} course`,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const getStudentCourseSummarybyID = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courses = await StudentCourse.findOne({
      where: { [Op.and]: [{ studentId: req.userId }, { courseId: courseId }] },
      attributes: ["progress"],
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["courseId", "name"],
          include: [
            { model: Material, as: "material" },
            { model: Assignment, as: "assignments" },
            { model: Quiz, as: "quiz" },
          ],
        },
      ],
    });
    if (courses.length < 1) {
      return res.status(200).json({
        msg: "belum ada course",
        data: {
          courses,
        },
      });
    }
    return res.status(200).json({
      msg: `berhasil meretrieve data sebanyak ${courses.length} course`,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const getStudentsCourse = async (req, res) => {
  try {
    const courses = await StudentCourse.findAll({
      where: { studentId: req.userId },
      attributes: ["progress"],
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["courseId", "name", "desc"],
        },
      ],
    });
    if (courses.length < 1) {
      return res.status(200).json({
        msg: "belum ada course",
        data: {
          courses,
        },
      });
    }
    return res.status(200).json({
      msg: `berhasil meretrieve data sebanyak ${courses.length} course`,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const studentTakeCourse = async (req, res) => {
  try {
    const { courseId, enrolKey } = req.body;

    const alreadyIn = await StudentCourse.findOne({
      where: {
        [Op.and]: [{ courseId: courseId }, { studentId: req.userId }],
      },
    });

    if (alreadyIn) {
      return res.status(403).json({
        msg: "anda sudah masuk ke course",
        data: {
          courseTaken: courseId,
        },
      });
    }

    const existCourse = await Course.findOne({
      where: { courseId: courseId },
    });

    if (!existCourse) {
      return res.status(404).json({
        msg: `course tidak ditemukan`,
        data: {
          invalidId: `course dengan id ${courseId} tidak ditemukan`,
        },
      });
    }

    let match;
    if (existCourse.enrolKey) {
      match = existCourse.enrolKey == enrolKey;
    } else {
      match = true;
    }

    return res.status(200).json({
      msg: `berhasil masuk ke course ${existCourse.name}`,
      data: {
        courseId: existCourse.courseId,
        name: existCourse.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ["courseId", "name"],
    });
    if (courses.length < 1) {
      return res.status(200).json({
        msg: "belum ada course",
        data: {
          courses,
        },
      });
    }
    return res.status(200).json({
      msg: `berhasil meretrieve data sebanyak ${courses.length} course`,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};

export const getCourseByID = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courses = await Course.findOne({
      where: { courseId: courseId },
      attributes: ["courseId", "name", "desc", "enrolKey"],
    });
    if (!courses) {
      return res.status(200).json({
        msg: "course tidak ditemukan",
        data: {
          courses,
        },
      });
    }
    return res.status(200).json({
      msg: `berhasil meretrieve data ${courses.name}`,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `terjadi kesalahan ${error.message}`,
      data: {
        err: error,
      },
    });
  }
};
