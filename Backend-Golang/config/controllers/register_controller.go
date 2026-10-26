package controllers

import (
	"net/http"
	"strings"

	"flowplay/backend/database"
	"flowplay/backend/helpers"
	"flowplay/backend/models"
	"flowplay/backend/structs"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Register(c *gin.Context) {
	var request structs.RegisterRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Error: "Data pendaftaran tidak valid.", Fields: helpers.ValidationErrors(err),
		})
		return
	}
	hash, err := helpers.HashPassword(request.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{Error: "Gagal mengamankan password."})
		return
	}
	user := models.User{
		FullName:     strings.TrimSpace(request.FullName),
		Username:     strings.ToLower(strings.TrimSpace(request.Username)),
		PasswordHash: hash,
	}
	err = database.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Omit("Progress").Create(&user).Error; err != nil {
			return err
		}
		return tx.Create(&models.UserProgress{UserID: user.ID}).Error
	})
	if err != nil {
		if helpers.IsDuplicateEntry(err) {
			c.JSON(http.StatusConflict, structs.ErrorResponse{Error: "Username sudah terdaftar."})
			return
		}
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{Error: "Pendaftaran gagal."})
		return
	}
	c.JSON(http.StatusCreated, structs.SuccessResponse{Message: "Pendaftaran berhasil."})
}
