import bodyParser from "body-parser"
import cors from "cors"
import express, { Express, NextFunction, Request, Response } from "express"
import fs from "fs"
import path from "path"
import "reflect-metadata"
import { EntityNotFoundError } from "typeorm"
import { ResponseUtil } from "./utils/Response"

import { ValidationError } from "class-validator"
import authorsRoutes from "./routes/author"
import booksRoutes from "./routes/book"

const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use("/authors", authorsRoutes)
app.use("/books", booksRoutes)

app.get("/images/:type/:id", (req: Request, res: Response) => {
  const { type, id } = req.params
  const imageTypes = ["authors", "books"]
  if (!imageTypes.includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid image type" })
  }

  // Set the file path based on the type
  let filePath = path.join(__dirname, "..", "uploads", type, id)

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "Image not found" })
  }

  // Read the file and send it as a response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error while reading image" })
    }
    res.set("Content-Type", "image/jpeg")
    res.send(data)
  })
})

app.all("*", (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    message: "Invalid route",
  })
})

// Define a middleware function to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err.length > 0 && err[0] instanceof ValidationError) {
    // return res.json(err)
    const errors = formatErrors(err)
    return res.status(422).json(errors)
  }

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

function formatErrors(err: any) {
  const errors = {}
  err.forEach((e) => {
    if (!errors[e.property]) {
      errors[e.property] = []
    }
    errors[e.property].push(e.constraints[Object.keys(e.constraints)[0]])
  })
  return errors
}

export default app
