package jwt

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"log"
)

func Generate(payload Payload, tokenType string) (string, error) {
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)

	secret := GetSecret(tokenType)

	jsonHeader, err := json.Marshal(GetHeader())
	if err != nil {
		log.Println(err)
		return "", err
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		log.Println(err)
		return "", err
	}

	log.Println("generate, why?", tokenType) //<- debug porpuse

	jsonWebHeader := encoder.EncodeToString(jsonHeader)
	jsonWebPayload := encoder.EncodeToString(jsonPayload)

	jw := jsonWebHeader + "." + jsonWebPayload

	hmac := hmac.New(sha256.New, []byte(secret))
	hmac.Write([]byte(jw))

	jwHashed := hmac.Sum(nil)

	jwt := jw + "." + encoder.EncodeToString(jwHashed)
	return jwt, nil
}
