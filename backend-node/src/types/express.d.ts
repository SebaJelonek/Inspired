import { Request } from "express";
import { TokenType } from "app/gen/proto/media/v1/auth_media";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // Change to string if your gRPC ID is a string/UUID
      tokenType?: TokenType;
    }
  }
}
