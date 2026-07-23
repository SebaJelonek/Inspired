package internals

import (
	"time"

	"github.com/SebaJelonek/Inspired/jwt"
)

func GeneratePayload(userId int32, tokenType string) jwt.Payload {
	var expire int64
	issuedAt := time.Now().UnixMilli()
	user := int(userId)

	switch tokenType {
	case "auth":
		expire = issuedAt + time.Now().Add(time.Hour/2).UnixMilli()
	case "session":
		expire = issuedAt + time.Now().AddDate(0, 0, 30).UnixMilli()
	}

	payload := jwt.Payload{
		UserID:     user,
		IssuedAt:   issuedAt,
		Expiration: expire,
	}

	return payload
}
