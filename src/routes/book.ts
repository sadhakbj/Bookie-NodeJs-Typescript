import express from "express"
import { BooksController } from "../controllers/BooksController"

const booksController = new BooksController()
const router = express.Router()
router.get("/", booksController.getBooks)
router.get("/:id", booksController.getBook)
router.post("/", booksController.createBook)
router.put("/:id", booksController.updateBook)
router.delete("/:id", booksController.deleteBook)

export default router
