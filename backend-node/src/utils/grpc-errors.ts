import { ServiceError, status as GrpcStatus } from "@grpc/grpc-js";
import { HttpErrorResponse } from "app/utils/errors";

export class GrpcErrorResponse extends HttpErrorResponse {
  constructor(grpcErr: ServiceError) {
    const { httpStatus, kind } = GrpcErrorResponse.mapGrpcToHttpStatus(grpcErr.code);

    super(httpStatus, {
      message: grpcErr.details || grpcErr.message || "gRPC Service Error",
      kind,
    });

    Object.setPrototypeOf(this, GrpcErrorResponse.prototype);
  }

  // Maps gRPC Status Codes to standard HTTP Status Codes & Error Kinds
  private static mapGrpcToHttpStatus(grpcCode: number): { httpStatus: number; kind: string } {
    switch (grpcCode) {
      case GrpcStatus.INVALID_ARGUMENT:
        return { httpStatus: 400, kind: "BAD_REQUEST" };
      case GrpcStatus.UNAUTHENTICATED:
        return { httpStatus: 401, kind: "UNAUTHORIZED" };
      case GrpcStatus.PERMISSION_DENIED:
        return { httpStatus: 403, kind: "FORBIDDEN" };
      case GrpcStatus.NOT_FOUND:
        return { httpStatus: 404, kind: "NOT_FOUND" };
      case GrpcStatus.ALREADY_EXISTS:
        return { httpStatus: 409, kind: "CONFLICT" };
      case GrpcStatus.UNAVAILABLE:
        return { httpStatus: 503, kind: "SERVICE_UNAVAILABLE" };
      case GrpcStatus.DEADLINE_EXCEEDED:
        return { httpStatus: 504, kind: "GATEWAY_TIMEOUT" };
      default:
        return { httpStatus: 500, kind: "INTERNAL_SERVER_ERROR" };
    }
  }
}
