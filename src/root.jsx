// @refresh reload
import {struct, globe} from "~/config/shop"
import logo from "~/config/asset/logo.jpg"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/feat/priv/generic/def"
import home from "~/feat/priv/generic/home"
import sign_in from "~/feat/priv/login/sign_in"
import sign_up from "~/feat/priv/login/sign_up"
import chat from "~/feat/priv/chat/chat"
import search from "~/feat/priv/search/result"
import prod from "~/feat/priv/prod/long"
import cart from "~/feat/priv/cart/cart"
import paid from "~/feat/priv/cart/paid"

export default () => {
	// can set globe here
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
