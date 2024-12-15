import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Course from "./Course.js";

const Assignment = mainDB.define(
  "assignment",
  {
    assignmentId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "tidak ada deskripsi yang tersedia",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: true }
);

Course.hasMany(Assignment, {
  foreignKey: "courseId",
  as: "assignments" /* kalo manggil assignment dari course makenya assignment */,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Assignment.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course" /* kalo manggil course dari assignment makenya course */,
});

export default Assignment;
