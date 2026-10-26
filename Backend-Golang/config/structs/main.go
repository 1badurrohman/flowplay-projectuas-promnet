package main

import (
	"log"

	"flowplay/backend/config"
	"flowplay/backend/database"
	"flowplay/backend/routes"
)

func main() {
	config.LoadEnv()
	if len(config.GetEnv("JWT_SECRET", "")) < 32 {
		log.Fatal("JWT_SECRET must contain at least 32 characters")
	}
	database.InitDB()
	if err := routes.SetupRouter().Run(":" + config.GetEnv("APP_PORT", "8080")); err != nil {
		log.Fatal(err)
	}
}
