import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Compound = sequelize.define(
  "Compound",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    CompoundName: { type: DataTypes.STRING, allowNull: false },
    CompoundDescription: { type: DataTypes.TEXT, allowNull: false },
    strImageSource: { type: DataTypes.STRING, allowNull: false },
    strImageAttribution: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "compounds",
    timestamps: true,
  }
);
