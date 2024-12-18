import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Course from "./Course.js";
import User from "./User.js";
import Quiz from "./Quiz.js";

const StudentCourse = mainDB.define(
  "studentcourse",
  {
    studentcourseId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 100,
        min: 0,
      },
    },
  },
  { timestamps: true }
);

Course.hasMany(StudentCourse, {
  foreignKey: "courseId",
  as: "course",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

StudentCourse.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

User.hasMany(StudentCourse, {
  foreignKey: "studentId",
  as: "student",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

StudentCourse.belongsTo(User, {
  foreignKey: "studentId",
  as: "student",
});

export default StudentCourse;
