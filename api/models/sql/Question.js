import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Quiz from "./Quiz.js";

const Question = mainDB.define(
  "question",
  {
    questionId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "multiple-choice",
      validate: {
        notEmpty: true,
        isIn: [["multiple-choice", "essay"]],
      },
    },
    quizId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

Quiz.hasMany(Question, {
  foreignKey: "quizId",
  as: "question",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Question.belongsTo(Quiz, {
  foreignKey: "quizId",
  as: "quiz",
});

export default Question;
