import logo from "~/fe/config/asset/logo.jpg"
import header from "~/fe/config/header"
import footer from "~/fe/config/footer"
import def from "~/fe/config/def"
import home from "~/fe/generic/home"
import sign_in from "~/fe/login/sign_in"
import sign_up from "~/fe/login/sign_up"
import chat from "~/fe/chat/chat"
import search from "~/fe/search/result"
import prod from "~/fe/prod/long"
import cart from "~/fe/cart/cart"
import paid from "~/fe/cart/paid"

export default () => {
	return {
		page: () => [
			["*", def],
			["/", home],
			["/signin", sign_in],
			["/signup", sign_up],
			["/chat", chat],
			["/search", search],
			["/prod/:_id", prod],
			["/cart", cart],
			["/cart/paid", paid],
		],
		title: () => " - iStuff",
		logo,
		header,
		footer,
		style: () => "c_black tc_white ts_2 tf_1 min-w-[320px]",
	}
}