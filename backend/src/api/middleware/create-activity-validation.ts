import { NextFunction, Request, Response } from "express";
import { createActivitySchema } from "../dtos/ActivityDto";
import { formatError, includes, ZodError } from "zod";
import { HttpErrorResponse, HttpErrorResponseBody } from "app/utils/errors";

export function validateCreateActivity() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      createActivitySchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        let formatedError: HttpErrorResponseBody = { message: "", kind: "" };
        let path: string[] = [];
        let kind: string[] = [];
        let message: string[] = [];
        let finalMessage: string[] = [];

        error.issues.map((e) => {
          path.push(e.path[0]!.toString());
          kind.push(e.code);
          message.push(e.message);
        });

        const kinds = kind.join(" | ");

        message.map((m, i) => {
          const [expected, received] = m.split(",");
          if (received?.includes("undefined")) {
            finalMessage.push(
              `Field '${path[i]}' is empty, please fill in the '${path[i]}' field.`
            );
          } else if (expected && received) {
            const expectedType = expected.replace(
              "Invalid input: expected ",
              ""
            );
            const receivedType = received.replace("received ", "").slice(1);

            finalMessage.push(
              `Field '${path[i]}' must be a ${expectedType}, but received a ${receivedType}.`
            );
          } else if (m.includes("option")) {
            finalMessage.push(
              `Field '${path[i]}' has a wrong input, expected to be "Low", "Medium" or "High".`
            );
          }
        });

        formatedError.message = finalMessage.join("\n");
        formatedError.kind = kinds;

        next(new HttpErrorResponse(400, formatedError));
      } else {
        next(error);
      }
    }
  };
}
