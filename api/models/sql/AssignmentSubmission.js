import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Assignment from "./Assignment.js";
import User from "./User.js";

const AssignmentSubmission = mainDB.define(
  "assignmentsubmission",
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
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 100,
        min: 0,
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: true }
);

Assignment.hasMany(AssignmentSubmission, {
  foreignKey: "assignmentId",
  as: "assignmentsubmission",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

AssignmentSubmission.belongsTo(Assignment, {
  foreignKey: "assignmentId",
  as: "assignmentsubmission",
});

User.hasMany(AssignmentSubmission, {
  foreignKey: "userId",
  as: "assignmentsubmitter",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

AssignmentSubmission.belongsTo(User, {
  foreignKey: "userId",
  as: "assignmentsubmitter",
});

export default AssignmentSubmission;
