package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.LoadHTMLTemplates("templates/*")
	r.GET("/", func(c *gin.Context) {
		h := gin.H{}
		c.HTML(200, "index.html", h)
	})
	r.Static("/static", "static-build")
	http.ListenAndServe(":8080", r)
}
