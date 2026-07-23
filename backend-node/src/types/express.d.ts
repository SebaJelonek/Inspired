import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // Change to string if your gRPC ID is a string/UUID
      tokenType?: "auth" | "session";
    }
  }
}
