import express from "express";
import { addProject, addTimeline, addYoutube, contact, deleteProject, deleteTimeline, deleteUser, deleteYoutube, getMyProfile, getUser, login, logout, register, updateUser } from "../controllers/UserController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);//This route is only for testing purposes, it won't connect with frontend.

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/user").get( getUser);

router.route("/admin/update").put(isAuthenticated, updateUser);


router.route("/admin/timeline/add").post(isAuthenticated, addTimeline);
router.route("/admin/youtube/add").post(isAuthenticated, addYoutube);
router.route("/admin/project/add").post(isAuthenticated, addProject);

router.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
router.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
router.route("/admin/project/:id").delete(isAuthenticated, deleteProject);
router.route("/admin/user/:id").delete(isAuthenticated, deleteUser); //This route is only for testing purposes, it won't connect with frontend.

router.route("/contact").post(contact);

export default router;