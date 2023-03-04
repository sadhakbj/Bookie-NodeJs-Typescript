import express, { Express, Request, Response } from "express";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";

import bodyParser from "body-parser";
import cors from "cors";
import { ImagesController } from "./http/controllers/ImagesController";
import authRoute from "./routes/auth";
import authorsRoute from "./routes/authors";
import booksRoute from "./routes/books";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imageController = new ImagesController();

app.use("/authors", authorsRoute);
app.use("/books", booksRoute);
app.use("/auth", authRoute);
app.get("/images/:type/:id", imageController.get);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(ErrorHandler.handleErrors);

export default app;
