import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getpost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", getpost);
router.delete("/deletepost/:postId/:userId", verifyUser, deletePost);
router.put("/updatepost/:postId/:userId", verifyUser, updatePost);

export default router;
