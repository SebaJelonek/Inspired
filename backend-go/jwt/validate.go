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

func Validate(jwt string, tokenType string) (bool, int, error) {
	var userID int = 0
	var secret string

	jwt = strings.TrimPrefix(jwt, "Bearer ")
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")

	if len(tokens) != 3 {
		return false, 0, fmt.Errorf("invalid token format: expected 3 parts, got %d", len(tokens))
	}

	headerStringEncoded := tokens[0]
	payloadStringEncoded := tokens[1]
	signatureStringEncoded := tokens[2]

	var payload Payload
	var header Header

	signatureString, err := encoder.DecodeString(signatureStringEncoded)
	if err != nil {
		log.Println(err)
		return false, userID, err
	}

	headerString, err := encoder.DecodeString(headerStringEncoded)
	if err != nil {
		log.Println(err)
		return false, userID, err
	}

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println(err)
		return false, userID, err
	}

	payloadDecoded := []byte(payloadString)
	headerDecoded := []byte(headerString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {
		log.Println(err)
		return false, userID, err
	}

	err = json.Unmarshal(headerDecoded, &header)
	if err != nil {
		log.Println(err)
		return false, userID, err
	}

	if header.Alg != "HS256" { //wrong algo
		return false, userID, err
	}

	if payload.Expiration < time.Now().UnixMilli() { //token expired
		return false, userID, err
	}

	secret = GetSecret(tokenType)
	signatureCheck := []byte(headerStringEncoded + "." + payloadStringEncoded)
	hmacNew := hmac.New(sha256.New, []byte(secret))
	hmacNew.Write(signatureCheck)
	signatureCheck = hmacNew.Sum(nil)
	isValid := hmac.Equal(signatureCheck, signatureString)

	if isValid {
		userID = payload.UserID
	}

	return isValid, userID, nil
}
