package jwt

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"log"
	"strings"
	"time"
)

func Validate(jwt string, tokenType string) (bool, int) {
	var userID int = 0
	var secret string

	jwt = strings.TrimPrefix(jwt, "Bearer ")
	encoder := base64.URLEncoding.WithPadding(base64.NoPadding)
	tokens := strings.Split(jwt, ".")

	if len(tokens) != 3 {
		return false, 0
	}

	headerStringEncoded := tokens[0]
	payloadStringEncoded := tokens[1]
	signatureStringEncoded := tokens[2]

	var payload Payload
	var header Header

	signatureString, err := encoder.DecodeString(signatureStringEncoded)
	if err != nil {
		log.Println(err)
		return false, userID
	}

	headerString, err := encoder.DecodeString(headerStringEncoded)
	if err != nil {
		log.Println(err)
		return false, userID
	}

	payloadString, err := encoder.DecodeString(payloadStringEncoded)
	if err != nil {
		log.Println(err)
		return false, userID
	}

	payloadDecoded := []byte(payloadString)
	headerDecoded := []byte(headerString)

	err = json.Unmarshal(payloadDecoded, &payload)
	if err != nil {
		log.Println(err)
		return false, userID
	}

	err = json.Unmarshal(headerDecoded, &header)
	if err != nil {
		log.Println(err)
		return false, userID
	}

	if header.Alg != "HS256" { //wrong algo
		return false, userID
	}

	if payload.Expiration < time.Now().UnixMilli() { //token expired
		return false, userID
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

	return isValid, userID
}
