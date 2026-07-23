package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"

	mediav1 "github.com/SebaJelonek/Inspired/gen/media/v1"
	"github.com/SebaJelonek/Inspired/internals"
	"github.com/SebaJelonek/Inspired/jwt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Server struct {
	mediav1.UnimplementedMediaServiceServer
}

func (s *Server) JwtGenerate(ctx context.Context, req *mediav1.JwtGenerateRequest) (*mediav1.JwtGenerateResponse, error) {

	payload := internals.GeneratePayload(req.UserId, req.TokenType)
	token, err := jwt.Generate(payload, req.TokenType)
	if err != nil {
		return nil, err
	}

	return &mediav1.JwtGenerateResponse{
		Token: token,
	}, nil
}

func (s *Server) JwtValidate(ctx context.Context, req *mediav1.JwtValidateRequest) (*mediav1.JwtValidateResponse, error) {

	isValid, userId, err := jwt.Validate(req.Token, req.TokenType)

	if err != nil {
		return nil, err
	}

	return &mediav1.JwtValidateResponse{IsValid: isValid, UserId: int32(userId)}, nil
}

func (s *Server) ProcessImage(ctx context.Context, req *mediav1.ProcessImageRequest) (*mediav1.ProcessImageResponse, error) {
	// Stub implementation to satisfy the interface
	return nil, status.Errorf(codes.Unimplemented, "method ProcessImage not implemented yet")
}

func main() {
	go func() {
		http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("OK"))
		})

		fmt.Println("go-auth-media service running on port 8080...")
		if err := http.ListenAndServe(":8080", nil); err != nil {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen : %v", err)
	}

	grpcServer := grpc.NewServer()

	mediav1.RegisterMediaServiceServer(grpcServer, &Server{})

	log.Println("gRPC server running on port :50051...")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
