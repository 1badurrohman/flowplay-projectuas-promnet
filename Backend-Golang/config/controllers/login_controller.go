package controllers

import (
	"net/http"
	"strings"

<<<<<<< HEAD
	"flowplay/backend/database"
	"flowplay/backend/helpers"
	"flowplay/backend/models"
	"flowplay/backend/structs"
=======
	"flowplay/backend/config/database"
	"flowplay/backend/config/helpers"
	"flowplay/backend/config/models"
	"flowplay/backend/config/structs"
>>>>>>> 302b7a7ea3f75565f0ccc5166657b6376b6ba78e

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var request structs.LoginRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{Error: "Username dan password wajib diisi."})
		return
	}
	var user models.User
	err := database.DB.Preload("Progress").
		Where("username = ?", strings.ToLower(strings.TrimSpace(request.Username))).
		First(&user).Error
	if err != nil || helpers.ComparePassword(user.PasswordHash, request.Password) != nil {
		c.JSON(http.StatusUnauthorized, structs.ErrorResponse{Error: "Username atau password salah."})
		return
	}
	token, err := helpers.GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{Error: "Gagal membuat sesi."})
		return
	}
	c.JSON(http.StatusOK, gin.H{
<<<<<<< HEAD
		"token": token,
		"user":  toUserResponse(user),
=======
		"token":    token,
		"user":     toUserResponse(user),
>>>>>>> 302b7a7ea3f75565f0ccc5166657b6376b6ba78e
		"progress": toProgressResponse(user.Progress),
	})
}
