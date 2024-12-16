import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Question from "./Question.js";

const QuestionOption = mainDB.define(
  "questionoption",
  {
    optionId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

Question.hasMany(QuestionOption, {
  foreignKey: "questionId",
  as: "questionoption",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

QuestionOption.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

export default QuestionOption;
