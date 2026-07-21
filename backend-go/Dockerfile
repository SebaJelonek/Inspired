# --- Stage 1: Build Stage ---
FROM golang:1.25-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Compile binary targeting cmd/auth-media/main.go
RUN CGO_ENABLED=0 GOOS=linux go build -o /auth-media ./cmd/auth-media/main.go

# --- Stage 2: Production Runtime Stage ---
FROM alpine:latest
WORKDIR /root/

# Copy static binary from builder
COPY --from=builder /auth-media .

EXPOSE 50051
CMD ["./auth-media"]
