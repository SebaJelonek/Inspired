package jwt

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
)

func Generate(payload Payload, tokenType TokenType) (string, error) {
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)

	secret, err := GetSecret(tokenType)
	if err != nil {
		return "", err
	}

	jsonHeader, err := json.Marshal(GetHeader())
	if err != nil {
		return "", err
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	jsonWebHeader := encoder.EncodeToString(jsonHeader)
	jsonWebPayload := encoder.EncodeToString(jsonPayload)

	jw := jsonWebHeader + "." + jsonWebPayload

	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(jw))

	jwHashed := mac.Sum(nil)

	jwToken := jw + "." + encoder.EncodeToString(jwHashed)
	return jwToken, nil
}
