package database

import (
	"fmt"
	"log"

	"flowplay/backend/config"
	"flowplay/backend/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.GetEnv("DB_USER", "flowplay"),
		config.GetEnv("DB_PASS", "flowplay"),
		config.GetEnv("DB_HOST", "localhost"),
		config.GetEnv("DB_PORT", "3306"),
		config.GetEnv("DB_NAME", "flowplay"),
	)
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to MySQL:", err)
	}
	if err = DB.AutoMigrate(&models.User{}, &models.UserProgress{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	log.Println("MySQL connected and migrated")
}
