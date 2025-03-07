

import { Router } from "express";
import { signUp,login } from "../controllers/user.controller.js";

const Userrouter = Router();

Userrouter.post("/signup", signUp);
Userrouter.get("/login", login);










export default Userrouter;