import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import { hash } from "bcrypt";

const User = mainDB.define(
  "user",
  {
    userId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "student",
      validate: {
        notEmpty: true,
        isIn: [["teacher", "student", "admin"]],
      },
    },
  },
  { timestamps: true }
);

// hash aja sebelum dibuat jadi nanti pas di controller gausah ribet ribet ngehash
User.beforeCreate(async (user) => {
  user.password = await hash(user.password, 10);
});

// seeder
export async function userseeder() {
  const users = [
    {
      email: "student1@ambaschool.com",
      pass: "student1",
      role: "student",
    },
    {
      email: "student2@ambaschool.com",
      pass: "student2",
      role: "student",
    },
    {
      email: "teacher@ambaschool.com",
      pass: "teacher",
      role: "teacher",
    },
    {
      email: "admin@ambaschool.com",
      pass: "admin",
      role: "admin",
    },
  ];

  for (const user of users) {
    await User.create(user);
  }
}

export default User;
