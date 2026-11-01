package middlewares

import (
	"net/http"
	"strings"

<<<<<<< HEAD
	"flowplay/backend/helpers"
	"flowplay/backend/structs"
=======
	"flowplay/backend/config/helpers"
	"flowplay/backend/config/structs"
>>>>>>> 302b7a7ea3f75565f0ccc5166657b6376b6ba78e

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
