package helpers

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

func ValidationErrors(err error) map[string]string {
	fields := make(map[string]string)
	if errors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range errors {
			fields[fieldError.Field()] = "Nilai tidak valid: " + fieldError.Tag()
		}
	}
	return fields
}

func IsDuplicateEntry(err error) bool {
	return err != nil && strings.Contains(err.Error(), "Duplicate entry")
}
