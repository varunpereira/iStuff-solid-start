import '~/fe/config/style.scss'
import logo from "~/fe/config/asset/logo.jpg"
import header from "~/fe/config/header"
import footer from "~/fe/config/footer"
import def from "~/fe/generic/def"
import home from "~/fe/generic/home"
import sign_in from "~/fe/login/sign_in"
import sign_up from "~/fe/login/sign_up"
import chat from "~/fe/chat/chat"
import search from "~/fe/search/result"
import prod from "~/fe/prod/long"
import cart from "~/fe/cart/cart"
import paid from "~/fe/cart/paid"

var page = () => [
	["*", def],
	["/", home],
	["/signin", sign_in],
	["/signup", sign_up],
	["/chat", chat],
	["/search", search],
	["/prod", prod],
	["/cart", cart],
	["/cart/paid", paid],
]

var title = () => "iStuff"

var style = () => "c_black tc_white ts_2 tf_1"

export default {title, logo, header, footer, page, style}
