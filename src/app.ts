import bodyParser from "body-parser"
import cors from "cors"
import express, { Express, NextFunction, Request, Response } from "express"
import "reflect-metadata"
import { EntityNotFoundError } from "typeorm"
import { ResponseUtil } from "./utils/Response"

import authorsRoutes from "./routes/author"
import booksRoutes from "./routes/book"
import { ErrorHandler } from "./utils/Errorhandler"

const app: Express = express()
// app.use("/uploads", express.static("uploads"));

// const upload = multer();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(upload.any());

app.use(cors())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use("/authors", authorsRoutes)
app.use("/books", ErrorHandler.handleErrors(booksRoutes))

app.all("*", (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    message: "Invalid route",
  })
})

// Define a middleware function to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err instanceof EntityNotFoundError) {
    return res.status(400).send({
      success: false,
      message: "Item you are looking for not found.",
    })
  }

  if (err.message === "Invalid file type") {
    return ResponseUtil.sendError(res, "Invalid file type", 422)
  }

  return res.status(500).send({
    success: false,
    message: "Internal server error",
  })
})

export default app
