import express from "express";
// import { googleauth } from "../controllers/authController.js";
import {  signup } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import { googleAuth } from "../controllers/authController.js";
import {googleDirect } from '../controllers/authController.js'
const router = express.Router();
router.post("/signup", signup);

router.post("/login", login);
router.post('/google',googleAuth);

router.post('/googlelogin',googleDirect)







export default router;

