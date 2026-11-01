package models

import "time"

type User struct {
	ID           uint         `json:"id" gorm:"primaryKey"`
	FullName     string       `json:"fullName" gorm:"size:120;not null"`
	Username     string       `json:"username" gorm:"size:40;uniqueIndex;not null"`
	PasswordHash string       `json:"-"`
	Progress     UserProgress `json:"progress,omitempty" gorm:"constraint:OnDelete:CASCADE;"`
	CreatedAt    time.Time    `json:"createdAt"`
	UpdatedAt    time.Time    `json:"updatedAt"`
}

type UserProgress struct {
	UserID           uint      `json:"-" gorm:"primaryKey"`
	XP               int       `json:"xp" gorm:"not null;default:0"`
	Score            int       `json:"score" gorm:"not null;default:0"`
	CompletedLessons int       `json:"completedLessons" gorm:"not null;default:0"`
	HasChallengeDone bool      `json:"hasChallengeDone" gorm:"not null;default:false"`
	HasQuizDone      bool      `json:"hasQuizDone" gorm:"not null;default:false"`
	UpdatedAt        time.Time `json:"updatedAt"`
}
