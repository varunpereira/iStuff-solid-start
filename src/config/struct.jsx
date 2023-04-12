// @refresh reload
import {struct, } from "~/config/store"
import logo from "~/config/asset/logo.jpg"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/feat/$/generic/def"
import home from "~/feat/$/generic/home"
import sign_in from "~/feat/$/login/sign_in"
import sign_up from "~/feat/$/login/sign_up"
import chat from "~/feat/$/pusher/chat"

export default () => {
	var route = () => [
		["*", def],
		["/", home],
		["/signin", sign_in],
		["/signup", sign_up],
		["/chat", chat],
	]
	return struct({header, logo, footer, route, style: () => "c_black tc_white ts_2 tf_1"})
}
