import { NextFunction, Request, Response } from "express";
import { ServiceError } from "@grpc/grpc-js";
import { AppServices } from "app/app-services";
import { HttpErrorResponse } from "app/utils/errors";
import { GrpcErrorResponse } from "app/utils/grpc-errors"; // your gRPC error transformer
import { wrap } from "app/utils/express";

export function authMiddleware({ mediaAuthClient }: AppServices) {
  return wrap(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    let tokenType: "auth" | "session" | undefined;

    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.session_token;

    // 1. Extract token and determine its type
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      tokenType = "auth";
    } else if (cookieToken) {
      token = cookieToken;
      tokenType = "session";
    }

    // 2. Validate token presence
    if (!token) {
      throw new HttpErrorResponse(401, {
        message: "Missing auth and session token",
        kind: "UNAUTHORIZED",
      });
    }

    if (!tokenType) {
      throw new HttpErrorResponse(400, {
        message: "The token type is missing",
        kind: "BAD_REQUEST",
      });
    }

    // 3. Perform gRPC validation call
    try {
      const response = await mediaAuthClient.jwtValidate({ token, tokenType });

      // If valid, attach user payload to req and pass control to next middleware
      if (response.isValid) {
        req.userId = response.userId;
        req.tokenType = tokenType;
        return next();
      }

      // If server responds valid=false
      throw new HttpErrorResponse(401, {
        message: "Invalid or expired authorization token",
        kind: "UNAUTHORIZED",
      });
    } catch (error: any) {
      // Re-throw if it's already an HttpErrorResponse
      if (error instanceof HttpErrorResponse) {
        throw error;
      }

      // Convert gRPC error (e.g. gRPC service unavailable, unauthenticated) into HttpErrorResponse
      if (error && typeof error.code === "number") {
        throw new GrpcErrorResponse(error as ServiceError);
      }

      // Fallback for unexpected internal errors
      throw error;
    }
  });
}
