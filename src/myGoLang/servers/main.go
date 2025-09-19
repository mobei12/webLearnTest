package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// writeJSON writes JSON safely even for special status codes that do not allow a body.
func writeJSON(c *gin.Context, code int, payload gin.H) {
	// For 204 No Content and 304 Not Modified, never write a body
	if code == http.StatusNoContent || code == http.StatusNotModified {
		c.Status(code)
		return
	}
	c.JSON(code, payload)
}

func parseDelay(c *gin.Context) time.Duration {
	if dStr := c.Query("delay"); dStr != "" {
		if ms, err := strconv.Atoi(dStr); err == nil && ms >= 0 && ms <= 600000 {
			return time.Duration(ms) * time.Millisecond
		}
	}
	return 0
}

func main() {
	r := gin.Default()

	// Root with quick usage
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Status Code Test Service (Gin)",
			"usage":   "/status/{code}?delay=ms[&strict=true] e.g. /status/200, /status/404, /status/302?delay=1000",
			"notes":   "strict=true 对 1xx 会尝试直接返回该状态码（注意：大多数客户端不会展示 1xx 作为最终响应）",
		})
	})

	// Generic endpoint to return any HTTP status code 100-599
	r.Any("/status/:code", func(c *gin.Context) {
		codeStr := c.Param("code")
		code, err := strconv.Atoi(codeStr)
		if err != nil || code < 100 || code > 599 {
			writeJSON(c, http.StatusBadRequest, gin.H{"error": "invalid status code (expect 100-599)"})
			return
		}

		if d := parseDelay(c); d > 0 {
			time.Sleep(d)
		}

		// For 1xx informational responses, many clients will not surface the response.
		// Provide two behaviors:
		// - strict=true: attempt to send the 1xx code as-is (no body)
		// - default: respond 200 with the requested code in headers/body for visibility
		if code >= 100 && code < 200 {
			if c.Query("strict") == "true" {
				c.Status(code)
				return
			}
			c.Header("X-Requested-Status", strconv.Itoa(code))
			// Return 200 with body describing the requested 1xx to make it visible in tools/browsers
			writeJSON(c, http.StatusOK, gin.H{
				"requested_status": code,
				"note":            "1xx 信息性状态码通常不会作为最终响应被客户端展示，已用 200 包裹返回。若需严格返回，请加 strict=true",
			})
			return
		}

		// For other codes, try to include a short body except for 204/304
		msg := http.StatusText(code)
		if msg == "" {
			msg = "Custom Status"
		}

		// Redirect class: If a Location param is provided, set it.
		if code >= 300 && code < 400 {
			if loc := c.Query("location"); loc != "" {
				c.Header("Location", loc)
			}
		}

		writeJSON(c, code, gin.H{
			"status": code,
			"text":   msg,
		})
	})

	// Handy shortcuts for common codes
	r.GET("/ok", func(c *gin.Context) { writeJSON(c, http.StatusOK, gin.H{"status": 200, "text": http.StatusText(200)}) })
	r.GET("/bad-request", func(c *gin.Context) { writeJSON(c, http.StatusBadRequest, gin.H{"status": 400, "text": http.StatusText(400)}) })
	r.GET("/unauthorized", func(c *gin.Context) { writeJSON(c, http.StatusUnauthorized, gin.H{"status": 401, "text": http.StatusText(401)}) })
	r.GET("/forbidden", func(c *gin.Context) { writeJSON(c, http.StatusForbidden, gin.H{"status": 403, "text": http.StatusText(403)}) })
	r.GET("/not-found", func(c *gin.Context) { writeJSON(c, http.StatusNotFound, gin.H{"status": 404, "text": http.StatusText(404)}) })
	r.GET("/conflict", func(c *gin.Context) { writeJSON(c, http.StatusConflict, gin.H{"status": 409, "text": http.StatusText(409)}) })
	r.GET("/internal-error", func(c *gin.Context) { writeJSON(c, http.StatusInternalServerError, gin.H{"status": 500, "text": http.StatusText(500)}) })

	// Start server
	_ = r.Run(":8080")
}
