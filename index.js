import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoutes from "./api/routes/AuthenticationRoute.js";
import morgan from "morgan";
import { configMainDB, configSecondaryDB } from "./api/config/config.js";

dotenv.config();

const server = express();
server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

server.get("/", async (req, res) => {
  res.send("hallo from backend");
});

server.use(AuthRoutes);

const isConfigToMainDB = configMainDB();
const isConfigToSecondaryDB = configSecondaryDB();

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server is running in ${
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.SERVER_PORT}`
        : `${process.env.SERVER_HOSTED_URL}`
    }`
  );
});
