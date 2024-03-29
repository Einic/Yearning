package otp

import (
	"github.com/cookieY/yee"
)

func OtpRestFulAPis() yee.RestfulAPI {
	return yee.RestfulAPI{
		Post: Post,
		Get:  Get,
	}
}
