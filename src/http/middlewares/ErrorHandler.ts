import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "../../utils/Response";

export class ErrorHandler {
  static catchErrors(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    if (err instanceof EntityNotFoundError) {
      return ResponseUtil.sendError(res, "Item/page you are looking for does not exist", 404, null);
    }

    if (err.length > 0 && err[0] instanceof ValidationError) {
      const errors = ErrorHandler.formatErrors(err);
      return ResponseUtil.sendError(res, "Invalid input", 422, errors);
    }

    if (err.message === "Invalid file type") {
      return ResponseUtil.sendError(res, "Invalid file type", 422, null);
    }

    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }

  static formatErrors(err: any) {
    const errors = {};
    err.forEach((e) => {
      if (!errors[e.property]) {
        errors[e.property] = [];
      }
      errors[e.property].push(e.constraints[Object.keys(e.constraints)[0]]);
    });
    return errors;
  }
}
