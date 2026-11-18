package jwt

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"
)

func Validate(jwt string, tokenType TokenType) (bool, int, error) { //return isValid, userId, error
	var userID int = 0
	var secret string
	var isValid bool = false

	jwt = strings.TrimPrefix(jwt, "Bearer ")
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")

	if len(tokens) != 3 {
		return isValid, 0, fmt.Errorf("invalid token format: expected 3 parts, got %d", len(tokens))
	}

	headerStringEncoded := tokens[0]
	payloadStringEncoded := tokens[1]
	signatureStringEncoded := tokens[2]

	var payload Payload
	var header Header

	signatureString, err := encoder.DecodeString(signatureStringEncoded)
	if err != nil {
		log.Println(err)
		return isValid, userID, err
	}

	headerString, err := encoder.DecodeString(headerStringEncoded)
	if err != nil {
		log.Println(err)
		return isValid, userID, err
	}

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println(err)
		return isValid, userID, err
	}

	payloadDecoded := []byte(payloadString)
	headerDecoded := []byte(headerString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {
		log.Println(err)
		return isValid, userID, err
	}

	err = json.Unmarshal(headerDecoded, &header)
	if err != nil {
		log.Println(err)
		return isValid, userID, err
	}

	if header.Alg != "HS256" { //wrong algo
		return isValid, userID, fmt.Errorf("unsupported algorithm: %s", header.Alg)
	}

	secret, err = GetSecret(tokenType)
	if err != nil {
		return isValid, userID, err
	}

	signatureCheck := []byte(headerStringEncoded + "." + payloadStringEncoded)
	hmacNew := hmac.New(sha256.New, []byte(secret))
	hmacNew.Write(signatureCheck)
	signatureCheck = hmacNew.Sum(nil)
	isValid = hmac.Equal(signatureCheck, signatureString)

	if !isValid {
		return isValid, userID, fmt.Errorf("validation of signature failed")
	}

	if payload.Expiration < time.Now().UnixMilli() { //token expired
		isValid = false
		return isValid, userID, fmt.Errorf("token expired")
	}

	userID = payload.UserID

	return isValid, userID, nil
}
