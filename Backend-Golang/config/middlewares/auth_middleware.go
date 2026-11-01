package middlewares

import (
	"net/http"
	"strings"

	"flowplay/backend/config/helpers"
	"flowplay/backend/config/structs"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if !strings.HasPrefix(header, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, structs.ErrorResponse{Error: "Sesi tidak ditemukan."})
			return
		}
		userID, err := helpers.ParseToken(strings.TrimPrefix(header, "Bearer "))
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, structs.ErrorResponse{Error: "Sesi tidak valid atau sudah kedaluwarsa."})
			return
		}
		c.Set("userID", userID)
		c.Next()
	}
}
