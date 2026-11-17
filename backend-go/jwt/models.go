package jwt

import (
	"fmt"
	"os"
)

type TokenType string

const (
	Auth    TokenType = "auth"
	Session TokenType = "session"
)

type Payload struct {
	UserID     int   `json:"uid"`
	IssuedAt   int64 `json:"iat"`
	Expiration int64 `json:"exp"`
	JWTID      *int  `json:"jti,omitempty"`
}

type Header struct {
	Alg  string `json:"alg"`
	Type string `json:"typ"`
}

func GetHeader() Header {
	var header = Header{
		Alg:  "HS256",
		Type: "JWT",
	}
	return header
}

func GetSecret(tokenType TokenType) (string, error) {
	var envVar string

	switch tokenType {
	case Auth:
		envVar = "JWT_AUTH_SECRET"
	case Session:
		envVar = "JWT_SESSION_SECRET"
	default:
		return "", fmt.Errorf("wrong token type")
	}

	secret := os.Getenv(envVar)
	if secret == "" {
		return "", fmt.Errorf("%s is empty", envVar)
	}

	return secret, nil
}
