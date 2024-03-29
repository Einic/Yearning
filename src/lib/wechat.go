/**
 * @Author: Einic <einicyeo AT gmail.com>
 * @Description:
 * @File: wechat
 * @Version: 1.0.0
 * @Date: 2024/3/20 16:03
 * @BLOG:  https://www.infvie.com
 * @Project home page:
 *     @https://github.com/Einic/EnvoyinStack
 */

package lib

import (
	"Yearning-go/src/i18n"
	"Yearning-go/src/model"
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"github.com/cookieY/yee/logger"
	"io"
	"net/http"
	"strings"
)

var WCommontext = `
{
   "msgtype": "markdown",
   "markdown": {
       "content": "**Yearning工单通知:** \n
        >**工单编号: **<font color=\"comment\">$WORKID</font>
        >**数据源: **<font color=\"comment\"> $SOURCE</font>
        >**工单说明: **<font color=\"comment\"> $TEXT</font>
        >**提交人员: **<font color=\"#78beea\"> $USER</font>
        >**下一步操作人: **<font color=\"fe8696\"> $AUDITOR</font>
        >**平台地址: **<font color=\"comment\"> [$HOST]($HOST)</font>
        >**状态: **<font color=\"1abefa\">$STATE</font>"
   }
}
`

func SendWechatMsg(msg model.Message, sv string) {
	chathook := msg.ChatHook

	if msg.ChatKey != "" {
		chathook = msg.ChatHook + msg.ChatKey
	}
	model.DefaultLogger.Debugf("ChatHook:%v", chathook)
	req, err := http.NewRequest("POST", chathook, strings.NewReader(sv))
	if err != nil {
		logger.DefaultLogger.Errorf("ChatRequest:", err)
		return
	}

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	client := &http.Client{Transport: tr}
	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	resp, err := client.Do(req)

	if err != nil {
		logger.DefaultLogger.Errorf("resp:", err)
		return
	}
	body, _ := io.ReadAll(resp.Body)
	model.DefaultLogger.Debugf("resp:%v", string(body))

	defer resp.Body.Close()
}

func chatMsgTplHandler(state string, generic interface{}) string {

	var order imCryGeneric
	switch v := generic.(type) {
	case model.CoreSqlOrder:
		order = imCryGeneric{
			Assigned: v.Assigned,
			WorkId:   v.WorkId,
			Source:   v.Source,
			Username: v.Username,
			Text:     v.Text,
		}
	case model.CoreQueryOrder:
		order = imCryGeneric{
			Assigned: v.Assigned,
			WorkId:   v.WorkId + i18n.DefaultLang.Load(i18n.INFO_QUERY),
			Source:   i18n.DefaultLang.Load(i18n.ER_QUERY_NO_DATA_SOURCE),
			Username: v.Username,
			Text:     v.Text,
		}
	}

	if !stateHandler(state) {
		order.Assigned = "无"
	}
	text := WCommontext
	text = strings.Replace(text, "$STATE", state, -1)
	text = strings.Replace(text, "$WORKID", order.WorkId, -1)
	text = strings.Replace(text, "$SOURCE", order.Source, -1)
	model.DefaultLogger.Debugf("$HOST:%v", model.GloOther.Domain)
	text = strings.Replace(text, "$HOST", model.GloOther.Domain, -1)
	text = strings.Replace(text, "$USER", order.Username, -1)
	text = strings.Replace(text, "$AUDITOR", order.Assigned, -1)
	text = strings.Replace(text, "$TEXT", order.Text, -1)
	fmt.Println(text)
	return text
}

func DingTosendWechat(ChatAddr string, md map[string]interface{}) error {
	var msg model.Message
	chathook := msg.ChatHook

	if msg.ChatKey != "" || msg.ChatHook != "" {
		chathook = msg.ChatHook + msg.ChatKey
	}

	chathook = ChatAddr

	model.DefaultLogger.Debugf("chathook:%v", chathook)

	requestData, _ := json.Marshal(md)
	model.DefaultLogger.Debugf("Sending wechat: %s\n", requestData)
	resp, err := http.Post(chathook, "application/json", bytes.NewBuffer(requestData))
	if err != nil {
		model.DefaultLogger.Debugf("Failed to send request: %v", err)
		return err
	}
	defer resp.Body.Close()

	model.DefaultLogger.Debugf("Response status: %s", resp.Status)

	responseBody, _ := io.ReadAll(resp.Body)
	model.DefaultLogger.Debugf("Response body: %s", responseBody)

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status: %s", resp.Status)
	}

	model.DefaultLogger.Debugf("Wechat sent successfully")
	return nil
}
