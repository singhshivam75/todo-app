import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Todo = sequelize.define("Todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
  { timestamps: true }
);

export default Todo;