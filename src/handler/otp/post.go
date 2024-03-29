/**
 * @Author: Einic <einicyeo AT gmail.com>
 * @Description:
 * @File: post
 * @Version: 1.0.0
 * @Date: 2024/3/26 13:57
 * @BLOG:  https://www.infvie.com
 * @Project home page:
 *     @https://github.com/Einic/EnvoyinStack
 */

package otp

import (
	"github.com/cookieY/yee"
)

func Post(c yee.Context) (err error) {
	switch c.Params("tp") {
	case "validate":
		return OptUserMfaValidate(c)
	}
	return err
}
