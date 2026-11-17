package jwt_test

import (
	"os"
	"testing"

	"github.com/SebaJelonek/Inspired/internals"
	"github.com/SebaJelonek/Inspired/jwt"
)

const (
	authSecret    = "test_auth_secret_key_123"
	sessionSecret = "test_session_secret_key_456"
)

func TestMain(m *testing.M) {
	os.Setenv("JWT_AUTH_SECRET", authSecret)
	os.Setenv("JWT_SESSION_SECRET", sessionSecret)
	os.Exit(m.Run())
}

func genToken(t *testing.T, userID int32, tokenType jwt.TokenType) string {
	t.Helper()
	payload := internals.GeneratePayload(userID, tokenType)
	token, err := jwt.Generate(payload, tokenType)
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}
	return token
}

func TestValidate(t *testing.T) {
	const userID = 101
	validAuth := genToken(t, userID, jwt.Auth)
	validSession := genToken(t, userID, jwt.Session)

	tests := []struct {
		name       string
		token      string
		tokenType  jwt.TokenType
		wantValid  bool
		wantUserID int
		wantErr    bool
	}{
		{"valid session token", validSession, jwt.Session, true, userID, false},
		{"valid auth token", validAuth, jwt.Auth, true, userID, false},
		{"auth token as session", validAuth, jwt.Session, false, 0, false},
		{"session token as auth", validSession, jwt.Auth, false, 0, false},
		{"malformed", "not.a.jwt.token", jwt.Auth, false, 0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			valid, gotUserID, err := jwt.Validate(tt.token, tt.tokenType)
			if (err != nil) != tt.wantErr {
				t.Fatalf("err = %v, wantErr %v", err, tt.wantErr)
			}
			if valid != tt.wantValid {
				t.Errorf("valid = %v, want %v", valid, tt.wantValid)
			}
			if gotUserID != tt.wantUserID {
				t.Errorf("userID = %d, want %d", gotUserID, tt.wantUserID)
			}
		})
	}
}
