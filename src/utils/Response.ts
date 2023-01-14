import { Response } from "express";

export class ResponseUtil {
  static sendResponse<T>(
    res: Response,
    data: T,
    pagiationInfo: any = null,
    statusCode = 200
  ): Response<T> {
    return res.status(statusCode).send({
      success: true,
      message: "Success",
      data,
      pagiationInfo,
    });
  }

  static sendError(
    res: Response,
    message: string,
    statusCode = 500,
    errors: any = null
  ): Response {
    return res.status(statusCode).send({
      success: false,
      message,
      errors,
    });
  }
}
