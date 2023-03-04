import { NextFunction, Request, Response } from "express"
import fs from "fs"
import path from "path"
import { ResponseUtil } from "../../utils/Response"

export class ImagesController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { type, id } = req.params
    const imagesTypes = ["authors", "books"]
    if (!imagesTypes.includes(type)) {
      return ResponseUtil.sendErrror(res, "Invalid image type", 500, null)
    }
    let filePath = path.join(__dirname, "../../../", "uploads", type, id)

    if (!fs.existsSync(filePath)) {
      return ResponseUtil.sendErrror(res, "Invalid image", 404, null)
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        return ResponseUtil.sendErrror(res, "Invalid image / image read error", 404, null)
      }
      res.set("Content-Type", "image/jpeg")
      res.send(data)
    })
  }
}
