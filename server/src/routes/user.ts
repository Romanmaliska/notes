import express from "express";
import * as UsersControllers from "../controllers/users";
import requiresAuth from "../../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UsersControllers.getAuthenticatedUser);
router.post("/signup", UsersControllers.signUp);
router.post("/login", UsersControllers.login);
router.post("/logout", UsersControllers.logout);

export default router;
