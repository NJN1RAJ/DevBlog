import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create, deletePost, getpost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", getpost);
router.delete("/deletepost/:postId/:userId", verifyUser, deletePost);

export default router;
