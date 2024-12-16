import { DataTypes } from "sequelize";
import mainDB from "../../database/mainDb.js";
import User from "./User.js";
import Material from "./Material.js";

const MaterialSubmission = mainDB.define(
  "materialsubmission",
  {
    materialubmissionId: {
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
    materialId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

Material.hasMany(MaterialSubmission, {
  foreignKey: "materialId",
  as: "materialsubmission",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MaterialSubmission.belongsTo(Material, {
  foreignKey: "materialId",
  as: "materialsubmission",
});

User.hasMany(MaterialSubmission, {
  foreignKey: "userId",
  as: "materialsubmitter",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MaterialSubmission.belongsTo(User, {
  foreignKey: "userId",
  as: "materialsubmitter",
});

export default MaterialSubmission;
