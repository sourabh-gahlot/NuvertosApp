import express from "express";
import { connectDB, sequelize } from "./db";
import dotenv from "dotenv";
import "./models/compound";
import compoundsRoutes from "./compoundRoutes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Test route

app.use("/api/compounds", compoundsRoutes);
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = 3000;

(async () => {
  await connectDB();
  console.log("Registered models:", Object.keys(sequelize.models));

  // Sync models with DB (optional)
  await sequelize.sync({ alter: true }).then(() => {
    console.log("");
  });

  app.listen(process.env.PORT, () => {
    console.log(` Server running on http://localhost:${process.env.PORT}`);
  });
})();
