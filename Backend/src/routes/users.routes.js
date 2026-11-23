import { Router } from "express";
import userController from "../Controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/profile").get(authMiddleware, userController.profile);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;