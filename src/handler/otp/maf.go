/**
 * @Author: Einic <einicyeo AT gmail.com>
 * @Description:
 * @File: maf
 * @Version: 1.0.0
 * @Date: 2024/3/26 14:00
 * @BLOG:  https://www.infvie.com
 * @Project home page:
 *     @https://github.com/Einic/EnvoyinStack
 */

package otp

import (
	"Yearning-go/src/handler/common"
	"Yearning-go/src/lib"
	"Yearning-go/src/model"
	"github.com/cookieY/yee"
	"github.com/pquerna/otp/totp"
	"net/http"
	"strconv"
)

func OptUsermfa(c yee.Context) (err error) {
	t := new(lib.Token).JwtParse(c)
	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      "Yearning", // Change to your issuer name.
		AccountName: t.Username,
	})
	if err != nil {
		return err
	}

	// Generate an OTP based on the secret key.
	secret := key.Secret()

	if err != nil {
		return err
	}

	// Generate a QR code image for the OTP key URI.
	qrCodeURL := key.URL()
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, common.SuccessPayload(map[string]interface{}{
		"secret":    secret,
		"qrCodeUrl": qrCodeURL,
	}))
}

func OptUserMfaValidate(c yee.Context) (err error) {
	u := new(model.CoreAccount)
	if err = c.Bind(u); err != nil {
		return c.JSON(http.StatusOK, common.ERR_REQ_BIND)
	}

	t := new(lib.Token).JwtParse(c)
	if t == nil {
		return c.JSON(http.StatusUnauthorized, common.ERR_REQ_BIND)
	}

	valid := totp.Validate(strconv.Itoa(int(u.Passcode)), u.Secret)
	if valid {
		// Update user's secret in the database
		if err := model.DB().Model(&model.CoreAccount{}).Where("username = ?", t.Username).Updates(map[string]interface{}{
			"secret": u.Secret,
		}).Error; err != nil {
			return err
		}

		return c.JSON(http.StatusOK, common.SuccessPayload("Valid 2FA passcode"))
	} else {
		return c.JSON(http.StatusOK, common.ERR_COMMON_TEXT_MESSAGE("Invalid 2FA passcode"))
	}
}
