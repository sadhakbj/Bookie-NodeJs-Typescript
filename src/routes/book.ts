import { BooksController } from "@/controllers/BooksController"
import { AuthMiddleware } from "@/middlewares/AuthMiddleware"
import { ErrorHandler } from "@/utils/Errorhandler"
import express from "express"

const booksController = new BooksController()
const router = express.Router()
router.get("/", booksController.getBooks)
router.get("/:id", booksController.getBook)
router.post(
  "/",
  ErrorHandler.handleErrors(AuthMiddleware.authenticate),
  ErrorHandler.handleErrors(booksController.createBook)
)
router.put("/:id", ErrorHandler.handleErrors(booksController.updateBook))
router.delete("/:id", booksController.deleteBook)

export default router
