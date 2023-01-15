import express from "express"
import { AuthorsController } from "../controllers/AuthorsController"
import { FileUploader } from "../middlewares/FileUploader"
import { ErrorHandler } from "../utils/Errorhandler"

const authorsController = new AuthorsController()

const router = express.Router()

router.get("/", ErrorHandler.handleErrors(authorsController.getAuthors))
router.get("/:id", ErrorHandler.handleErrors(authorsController.getAuthor))
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.handleErrors(authorsController.createAuthor)
)
router.put("/:id", ErrorHandler.handleErrors(authorsController.updateAuthor))
router.delete("/:id", ErrorHandler.handleErrors(authorsController.deleteAuthor))

export default router
