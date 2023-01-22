import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AppDataSource } from "./../database/data-source"
import { User } from "./../entities/User"
import { ResponseUtil } from "./../utils/Response"

interface DecodedRequest extends Request {
  decoded: any
}

export class AuthMiddleware {
  static async authenticate(req: DecodedRequest, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization

    if (!tokenHeader) {
      return ResponseUtil.sendError(res, "No token header provided", 401, null)
    }

    const token = tokenHeader.split(" ")[1]

    try {
      const decoded = await jwt.verify(token, "secret123")
      const { _user: id } = decoded
      const repo = AppDataSource.getRepository(User)
      const user = await repo.findOneByOrFail({ id })
    } catch (err) {
      return ResponseUtil.sendError(res, "Invalid token", 401)
    }

    next()
  }
}
