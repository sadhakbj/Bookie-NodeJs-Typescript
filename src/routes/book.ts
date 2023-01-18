import express from "express"
import { BooksController } from "../controllers/BooksController"
import { ErrorHandler } from "./../utils/Errorhandler"

const booksController = new BooksController()
const router = express.Router()
router.get("/", booksController.getBooks)
router.get("/:id", booksController.getBook)
router.post("/", ErrorHandler.handleErrors(booksController.createBook))
router.put("/:id", ErrorHandler.handleErrors(booksController.updateBook))
router.delete("/:id", booksController.deleteBook)

export default router
