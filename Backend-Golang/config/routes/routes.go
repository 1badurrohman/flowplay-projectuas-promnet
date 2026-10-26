package routes

import (
	"net/http"

	"flowplay/backend/config"
	"flowplay/backend/controllers"
	"flowplay/backend/middlewares"
	"flowplay/backend/structs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{config.GetEnv("CORS_ORIGIN", "*")},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, structs.SuccessResponse{Status: "ok"})
	})
	router.POST("/api/auth/register", controllers.Register)
	router.POST("/api/auth/login", controllers.Login)

	protected := router.Group("/api", middlewares.AuthMiddleware())
	protected.GET("/me", controllers.Me)
	protected.PUT("/progress", controllers.UpdateProgress)
	protected.PATCH("/profile", controllers.UpdateProfile)
	protected.GET("/leaderboard", controllers.Leaderboard)
	return router
}
