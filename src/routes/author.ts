import express from "express";
import { AuthorsController } from "../controllers/AuthorsController";
import { ErrorHandler } from "../utils/Errorhandler";

const authorsController = new AuthorsController();

const router = express.Router();

router.get("/", ErrorHandler.handleErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.handleErrors(authorsController.getAuthor));
router.post("/", ErrorHandler.handleErrors(authorsController.createAuthor));
router.put("/:id", ErrorHandler.handleErrors(authorsController.updateAuthor));
router.delete(
  "/:id",
  ErrorHandler.handleErrors(authorsController.deleteAuthor)
);

export default router;
