import app from "@/config/app"
import { AppDataSource } from "@/database/data-source"
import { User } from "@/entities/User"
import { ResponseUtil } from "@/utils/Response"
import { compare } from "bcryptjs"
import { NextFunction, Request, Response } from "express"
import { sign, verify } from "jsonwebtoken"

export class AuthController {
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body
    const repo = AppDataSource.getRepository(User)

    const user = await repo.findOne({ where: { email } })

    if (!user) {
      return ResponseUtil.sendError(response, "Invalid credentials.", 401, null)
    }

    let passwordMatches = await compare(password, user.password)

    if (!passwordMatches) {
      return ResponseUtil.sendError(response, "Invalid credentials.", 401, null)
    }

    let accessToken = sign(
      {
        userId: user.id,
      },
      app.secret,
      {
        expiresIn: "15m",
      }
    )

    return ResponseUtil.sendResponse(response, {
      user: {
        id: user.id,
        full_name: user.name,
        email: user.email,
      },
      accessToken,
    })
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async currentUser(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization

    if (!tokenHeader) {
      return res.json({
        message: "No token provided",
      })
    }

    const token = tokenHeader.split(" ")[1]

    try {
      const payload = verify(token, app.secret)
      const user = payload as any

      const { email, userId } = user

      res.json({
        email,
        userId,
      })
    } catch (err: any) {
      return res.status(401).json({ success: false, message: err.message })
    }
  }
}
