import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Question from "./Question.js";
import QuestionOption from "./QuestionOption.js";

const AnswerKey = mainDB.define(
  "answerkey",
  {
    anskeyId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
  { timestamps: false }
);

Question.hasMany(AnswerKey, {
  foreignKey: "questionId",
  as: "questionanswer",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
AnswerKey.belongsTo(Question, {
  foreignKey: "questionId",
  as: "questionanswer",
});

QuestionOption.hasMany(AnswerKey, {
  foreignKey: "optionId",
  as: "optionanswer",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
AnswerKey.belongsTo(QuestionOption, {
  foreignKey: "optionId",
  as: "optionanswer",
});

export default AnswerKey;
