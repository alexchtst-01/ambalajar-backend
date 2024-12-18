import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoutes from "./api/routes/AuthenticationRoute.js";
import morgan from "morgan";
import { configMainDB } from "./api/config/config.js";

import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import mainDB from "./api/database/mainDb.js";
import CourseRoutes from "./api/routes/CourseRoutes.js";

dotenv.config();

const sessStore = SequelizeStore(session.Store);

const store = new sessStore({
  db: mainDB,
});

const server = express();
server.use(express.json());

server.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      /* ini lu isi nanti */
      // domain: ''
    },
  })
);
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
server.use(CourseRoutes);

const isConfigToMainDB = configMainDB();
store.sync();

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server is running in ${
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.SERVER_PORT}`
        : `${process.env.SERVER_HOSTED_URL}`
    }`
  );
});
