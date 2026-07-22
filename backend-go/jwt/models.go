package jwt

import "os"

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

func GetSecret(tokenType string) string {
	var secret string

	switch tokenType {
	case "auth":
		secret = os.Getenv("JWT_AUTH_SECRET")
	case "session":
		secret = os.Getenv("JWT_SESSION_SECRET")
	}
	return secret
}
