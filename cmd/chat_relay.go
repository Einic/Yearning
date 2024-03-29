/**
 * @Author: Einic <einicyeo AT gmail.com>
 * @Description:
 * @File: chat_relay
 * @Version: 1.0.0
 * @Date: 2024/3/21 20:59
 * @BLOG:  https://www.infvie.com
 * @Project home page:
 *     @https://github.com/Einic/EnvoyinStack
 */

package cmd

import (
	"Yearning-go/src/lib"
	"Yearning-go/src/model"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func PrintSettings() string {
	var k model.CoreGlobalConfiguration
	var msg model.Message
	model.DB().Select("message").First(&k)

	err := json.Unmarshal([]byte(string(k.Message)), &msg)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	result := fmt.Sprintf("%s%s", msg.ChatHook, msg.ChatKey)
	return result
}

func ChatRelay() {
	model.DBNew("./conf.toml")
	ChatAddr := PrintSettings()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.POST("/", func(c *gin.Context) {
		var data map[string]interface{}
		if err := c.BindJSON(&data); err != nil {
			fmt.Println("Request body:", c.Request.Body)

			model.DefaultLogger.Errorf("Failed to parse request body: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		if markdown, ok := data["markdown"].(map[string]interface{}); ok {
			if val, ok := markdown["text"]; ok {
				markdown["content"] = val
				delete(markdown, "text")
				delete(markdown, "title")

			}
		}

		err := lib.DingTosendWechat(ChatAddr, data)
		if err != nil {
			model.DefaultLogger.Errorf("Failed to send wechat: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "success"})
	})

	HttpAddr := model.C.General.HttpAddr
	if HttpAddr == "" {
		HttpAddr = "0.0.0.0:50002"
	}

	fmt.Println("The DingDing to WeChat relay server is live and accessible at: " + HttpAddr + "\n" +
		"No issues reported. (Optional: For more information, contact [Mail: einicyeo@gmail.com]).")

	r.Run(HttpAddr)
}
