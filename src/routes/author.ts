import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { AuthorsController } from "../controllers/AuthorsController";
import { ErrorHandler } from "../utils/Errorhandler";

const authorsController = new AuthorsController();

const router = express.Router();

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.resolve("uploads/users");
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    cb(null, folder);
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", ErrorHandler.handleErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.handleErrors(authorsController.getAuthor));
router.post(
  "/",
  upload.single("image"),
  ErrorHandler.handleErrors(authorsController.createAuthor)
);
router.put("/:id", ErrorHandler.handleErrors(authorsController.updateAuthor));
router.delete(
  "/:id",
  ErrorHandler.handleErrors(authorsController.deleteAuthor)
);

export default router;
