import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, userId, postId } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler(403, "Unauthorized to create a comment"));
    }
    if (content.length === 0) {
      return next(errorHandler(403, "Please fill the required fields"));
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
