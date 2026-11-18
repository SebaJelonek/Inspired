package jwt_test

import (
	"os"
	"strings"
	"testing"
	"time"

	"github.com/SebaJelonek/Inspired/internals"
	"github.com/SebaJelonek/Inspired/jwt"
)

const (
	authSecret    = "test_auth_secret_key_123"
	sessionSecret = "test_session_secret_key_456"
	happy         = false
	sad           = true
	valid         = true
	notValid      = false
)

func TestMain(m *testing.M) {
	os.Setenv("JWT_AUTH_SECRET", authSecret)
	os.Setenv("JWT_SESSION_SECRET", sessionSecret)
	os.Exit(m.Run())
}

func genValidToken(t *testing.T, userID int32, tokenType jwt.TokenType) string {
	t.Helper()
	payload := internals.GeneratePayload(userID, tokenType)
	token, err := jwt.Generate(payload, tokenType)
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}
	return token
}

func genExpiredToken(t *testing.T, userID int32, tokenType jwt.TokenType) string {
	t.Helper()

	payload := internals.GeneratePayload(userID, tokenType)
	payload.Expiration = time.Now().Add(-time.Hour).UnixMilli()
	token, err := jwt.Generate(payload, tokenType)
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}

	return token
}

func TestValidate(t *testing.T) {
	const userID = 101
	validAuth := genValidToken(t, userID, jwt.Auth)
	validSession := genValidToken(t, userID, jwt.Session)
	expiredToken := genExpiredToken(t, userID, jwt.Auth)

	parts := strings.Split(validSession, ".")
	tamperedPayload := parts[0] + ".eyJ1aWQiOjExMCwiaWF0IjozNTkwMDAwNDExNDAwLCJleHAiOjE3OTQ5OTkzMDU3MDB9." + parts[2]
	tamperedHeader := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVGl0eSJ9." + parts[1] + "." + parts[2]
	headerAlgoHS512 := "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9." + parts[1] + "." + parts[2]
	notBase64 := parts[0] + ".!!!NOTBASE64!!!." + parts[2]
	notJson := parts[0] + ".ZGVmaW5pdGVseSBub3QganNvbg." + parts[2]

	tests := []struct {
		name       string
		token      string
		tokenType  jwt.TokenType
		wantValid  bool
		wantUserID int
		wantErr    bool
	}{
		{"valid session token", validSession, jwt.Session, valid, userID, happy},               // happy path for session
		{"valid auth token", validAuth, jwt.Auth, valid, userID, happy},                        // happy path for auth
		{"bearer prefix auth", "Bearer " + validAuth, jwt.Auth, valid, userID, happy},          // happy path with Bearer auth
		{"bearer prefix session", "Bearer " + validSession, jwt.Session, valid, userID, happy}, // happy path with Bearer session
		{"empty token", "", jwt.Auth, notValid, 0, sad},                                        // sad path empty token
		{"malformed more than 3 parts", "not.a.jwt.token", jwt.Auth, notValid, 0, sad},         // sad path token lenth > 3
		{"malformed less than 3 parts", "not.jwt", jwt.Auth, notValid, 0, sad},                 // sad path token lenth < 3
		{"auth token as session", validAuth, jwt.Session, notValid, 0, sad},                    // sad path auth token treated as session
		{"session token as auth", validSession, jwt.Auth, notValid, 0, sad},                    // sad path session token treated as auth
		{"malformed payload", tamperedPayload, jwt.Auth, notValid, 0, sad},                     // sad path payload tempered with
		{"malformed header", tamperedHeader, jwt.Auth, notValid, 0, sad},                       // sad path header tempered with
		{"wrong algorithm", headerAlgoHS512, jwt.Auth, notValid, 0, sad},                       // sad path wrong algorythm
		{"wrong expiration date", expiredToken, jwt.Auth, notValid, 0, sad},                    // sad path iat > exp
		{"corrupted base64 payload", notBase64, jwt.Auth, notValid, 0, sad},                    // sad path payload is corrupted
		{"payload is not JSON", notJson, jwt.Auth, notValid, 0, sad},                           // sad path payload is not in json format
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			valid, gotUserID, err := jwt.Validate(tt.token, tt.tokenType)
			t.Logf("err = %v", err)
			if (err != nil) != tt.wantErr {
				t.Fatalf("err = %v, wantErr %v", err, tt.wantErr)
			}
			if valid != tt.wantValid {
				t.Errorf("valid = %v, want %v", valid, tt.wantValid)
			}
			if gotUserID != tt.wantUserID {
				t.Errorf("userID = %d, want %d", gotUserID, tt.wantUserID)
			}
			if (err != nil) != tt.wantErr {
				t.Errorf("Validate() error = %v\nwantErr %v", err, tt.wantErr)
			}
		})
	}
}
