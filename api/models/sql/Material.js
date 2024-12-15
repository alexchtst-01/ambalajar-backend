import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import Course from "./Course.js";

const Material = mainDB.define(
  "material",
  {
    materialId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: "tidak ada deskripsi yang tersedia",
      allowNull: false,
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
    materialUrl: {
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
  { timestamps: false }
);

Course.hasMany(Material, {
  foreignKey:
    "courseId" /* kalo manggil material dari course makenya material */,
  as: "material",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Material.belongsTo(Course, {
  foreignKey: "courseId" /* kalo manggil course dari material makenya course */,
  as: "course",
});

export default Material;
