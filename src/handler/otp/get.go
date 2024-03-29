/**
 * @Author: Einic <einicyeo AT gmail.com>
 * @Description:
 * @File: get
 * @Version: 1.0.0
 * @Date: 2024/3/26 13:58
 * @BLOG:  https://www.infvie.com
 * @Project home page:
 *     @https://github.com/Einic/EnvoyinStack
 */

package otp

import (
	"Yearning-go/src/handler/common"
	"github.com/cookieY/yee"
	"net/http"
)

func Get(c yee.Context) (err error) {
	switch c.Params("tp") {
	case "usermfa":
		return OptUsermfa(c)
	default:
		return c.JSON(http.StatusOK, common.ERR_REQ_FAKE)
	}
}
