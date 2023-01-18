import { validateOrReject } from "class-validator"
import { Request, Response } from "express"
import { CreateBookDTO } from "../dtos/CreateBookDTO"
import { AppDataSource } from "./../database/data-source"
import { Book } from "./../entities/Book"
import { ResponseUtil } from "./../utils/Response"

export class BooksController {
  async getBooks(req: Request, res: Response): Promise<Response> {
    const books = await AppDataSource.getRepository(Book).find()
    return ResponseUtil.sendResponse(res, books, 200)
  }

  async getBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const book = await AppDataSource.getRepository(Book).findOneBy({
      id: parseInt(req.params.id),
    })
    if (!book) {
      return ResponseUtil.sendError(res, "Book not found", 404)
    }
    return ResponseUtil.sendResponse(res, book, 200)
  }

  async createBook(req: Request, res: Response): Promise<Response> {
    const bookData = req.body
    const dto = new CreateBookDTO()
    Object.assign(dto, bookData)
    const errors = await validateOrReject(dto)

    const repo = AppDataSource.getRepository(Book)
    const book = repo.create(bookData)
    await repo.save(book)
    return ResponseUtil.sendResponse(res, book, 201)
  }

  async updateBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const bookData = req.body
    const dto = new CreateBookDTO()
    Object.assign(dto, bookData)
    dto.id = parseInt(id)

    const errors = await validateOrReject(dto)
    delete dto.id
    const repo = AppDataSource.getRepository(Book)
    const book = await repo.findOneBy({
      id: parseInt(req.params.id),
    })
    if (!book) {
      return ResponseUtil.sendError(res, "Book not found", 404)
    }
    repo.merge(book, bookData)
    await repo.save(book)
    return ResponseUtil.sendResponse(res, book)
  }

  async deleteBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const repo = AppDataSource.getRepository(Book)
    const book = await repo.findOneBy({
      id: parseInt(req.params.id),
    })
    if (!book) {
      return ResponseUtil.sendError(res, "book not found", 404)
    }
    await repo.remove(book)
    return ResponseUtil.sendResponse(res, null)
  }
}
