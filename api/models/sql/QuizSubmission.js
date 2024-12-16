import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import User from "./User.js";
import Question from "./Question.js";
import QuestionOption from "./QuestionOption.js";

const QuizSubmission = mainDB.define(
  "quizsubmission",
  {
    quizsubmissionId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        notEmpty: true,
        isIn: [["benar", "salah", "pending"]],
        len: [4, 8],
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    optionId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: true }
);

User.hasMany(QuizSubmission, {
  foreignKey: "userId",
  as: "quizsubmitter",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
QuizSubmission.belongsTo(User, {
  foreignKey: "userId",
  as: "quizsubmitter",
});

Question.hasMany(QuizSubmission, {
  foreignKey: "questionId",
  as: "question",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
QuizSubmission.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

QuestionOption.hasMany(QuizSubmission, {
  foreignKey: "optionId",
  as: "option",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
QuizSubmission.belongsTo(QuestionOption, {
  foreignKey: "optionId",
  as: "option",
});

export default QuizSubmission;
