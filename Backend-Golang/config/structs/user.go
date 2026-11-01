package structs

type RegisterRequest struct {
	FullName string `json:"fullName" binding:"required,max=120"`
	Username string `json:"username" binding:"required,min=3,max=40"`
	Password string `json:"password" binding:"required,min=8,max=72"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UpdateProfileRequest struct {
	Username string `json:"username" binding:"required,min=3,max=40"`
}

type ProgressRequest struct {
	XP               int  `json:"xp" binding:"min=0"`
	Score            int  `json:"score" binding:"min=0,max=100"`
	CompletedLessons int  `json:"completedLessons" binding:"min=0,max=6"`
	HasChallengeDone bool `json:"hasChallengeDone"`
	HasQuizDone      bool `json:"hasQuizDone"`
}

type UserResponse struct {
	ID       uint   `json:"id"`
	FullName string `json:"fullName"`
	Username string `json:"username"`
}

type ProgressResponse struct {
	XP               int  `json:"xp"`
	Score            int  `json:"score"`
	CompletedLessons int  `json:"completedLessons"`
	HasChallengeDone bool `json:"hasChallengeDone"`
	HasQuizDone      bool `json:"hasQuizDone"`
}
