package controllers

import (
	"net/http"
	"strings"

	"flowplay/backend/database"
	"flowplay/backend/helpers"
	"flowplay/backend/models"
	"flowplay/backend/structs"

	"github.com/gin-gonic/gin"
)

func Me(c *gin.Context) {
	var user models.User
	if err := database.DB.Preload("Progress").First(&user, currentUserID(c)).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{Error: "Pengguna tidak ditemukan."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": toUserResponse(user), "progress": toProgressResponse(user.Progress)})
}

func UpdateProfile(c *gin.Context) {
	var request structs.UpdateProfileRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{Error: "Username tidak valid."})
		return
	}
	var user models.User
	if err := database.DB.First(&user, currentUserID(c)).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{Error: "Pengguna tidak ditemukan."})
		return
	}
	user.Username = strings.ToLower(strings.TrimSpace(request.Username))
	if err := database.DB.Save(&user).Error; err != nil {
		if helpers.IsDuplicateEntry(err) {
			c.JSON(http.StatusConflict, structs.ErrorResponse{Error: "Username sudah digunakan."})
			return
		}
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{Error: "Profil gagal diperbarui."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": toUserResponse(user)})
}

func UpdateProgress(c *gin.Context) {
	var request structs.ProgressRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{Error: "Nilai progres tidak valid."})
		return
	}
	progress := models.UserProgress{
		UserID: currentUserID(c), XP: request.XP, Score: request.Score,
		CompletedLessons: request.CompletedLessons,
		HasChallengeDone: request.HasChallengeDone, HasQuizDone: request.HasQuizDone,
	}
	if err := database.DB.Save(&progress).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{Error: "Gagal menyimpan progres."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"progress": toProgressResponse(progress)})
}

func Leaderboard(c *gin.Context) {
	type leaderboardEntry struct {
		ID       uint   `json:"id"`
		Username string `json:"username"`
		XP       int    `json:"xp"`
	}
	var entries []leaderboardEntry
	err := database.DB.Table("users").
		Select("users.id, users.username, user_progresses.xp").
		Joins("JOIN user_progresses ON user_progresses.user_id = users.id").
		Order("user_progresses.xp DESC, user_progresses.updated_at ASC").
		Limit(10).Scan(&entries).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{Error: "Gagal memuat leaderboard."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"leaderboard": entries})
}

func currentUserID(c *gin.Context) uint {
	id, _ := c.Get("userID")
	return id.(uint)
}

func toUserResponse(user models.User) structs.UserResponse {
	return structs.UserResponse{ID: user.ID, FullName: user.FullName, Username: user.Username}
}

func toProgressResponse(progress models.UserProgress) structs.ProgressResponse {
	return structs.ProgressResponse{
		XP: progress.XP, Score: progress.Score, CompletedLessons: progress.CompletedLessons,
		HasChallengeDone: progress.HasChallengeDone, HasQuizDone: progress.HasQuizDone,
	}
}
