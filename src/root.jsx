// @refresh reload
import {struct} from "~/config/shop"
import logo from "~/config/asset/logo.jpg"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/generic/def"
import home from "~/generic/home"
import sign_in from "~/login/sign_in"
import sign_up from "~/login/sign_up"
import chat from "~/chat/chat"
import search from "~/search/result"
import prod from "~/prod/long"
import cart from "~/cart/cart"
import paid from "~/cart/paid"

export default () => {
	var page = () => [
		["*", def],
		["/", home],
		["/signin", sign_in],
		["/signup", sign_up],
		["/chat", chat],
		["/search", search],
		["/prod/:_id", prod],
		["/cart", cart],
		["/cart/paid", paid],
	]
	return struct({logo, header, footer, page, style: () => "c_black tc_white ts_2 tf_1"})
}
