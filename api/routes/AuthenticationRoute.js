import express from "express";
import { login, logout, me } from "../controller/AuthenticationController.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/auth/login", login);
AuthRoutes.get("/auth/me", me);
AuthRoutes.delete("/auth/logout", logout);

export default AuthRoutes;
