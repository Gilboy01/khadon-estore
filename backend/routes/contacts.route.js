import express from "express";
import { contact } from "../controllers/contact.controller.js";
import dotenv from "dotenv" ;

dotenv.config();
const router = express.Router();

router.post("/info", contact );

export default router;