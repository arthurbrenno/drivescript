package main

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type Claims struct {
	UserID         int    `json:"userid"`
	NivelPermissao int    `json:"nivel_permissao"`
	jwt.StandardClaims
}

type UserData struct {
	User     string `json:"user"`
	Password string `json:"password"`
}

func main() {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/drivescript")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Olá mundo!")
	})

	app.Post("/api/login", func(c *fiber.Ctx) error {
		var userData UserData
		if err := c.BodyParser(&userData); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Erro ao analisar os dados do usuário",
			})
		}

		var userID int
		var nivelPermissao int
		err := db.QueryRow("SELECT id, nivel_perm, password FROM usuarios WHERE username = ?", userData.User).Scan(&userID, &nivelPermissao)
		if err != nil {
			if err == sql.ErrNoRows {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"error": "Credenciais inválidas",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Erro ao consultar o banco de dados",
			})
		}

		err = bcrypt.CompareHashAndPassword([]byte(userData.Password), []byte(passwordFromDB)) 
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Credenciais inválidas",
			})
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claims{
			UserID:         userID,
			NivelPermissao: nivelPermissao,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			},
		})

		tokenString, err := token.SignedString([]byte("autodrivescript"))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Erro ao criar o token",
			})
		}

		return c.JSON(fiber.Map{
			"auth":    true,
			"token":   tokenString,
			"usuario": fiber.Map{"user": userData.User, "password": ""}, 
		})
	})

	port := 3000
	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
