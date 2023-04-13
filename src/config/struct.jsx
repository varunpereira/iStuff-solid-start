// @refresh reload
import {struct} from "~/config/store"
import logo from "~/config/asset/logo.jpg"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/feat/$/generic/def"
import home from "~/feat/$/generic/home"
import sign_in from "~/feat/$/login/sign_in"
import sign_up from "~/feat/$/login/sign_up"
import chat from "~/feat/$/chat/chat"
import prod from "~/feat/$/prod/long"
import search from "~/feat/$/search/result"

export default () => {
	var route = () => [
		["*", def],
		["/", home],
		["/signin", sign_in],
		["/signup", sign_up],
		["/chat", chat],
		["/prod/:_id", prod],
		["/search", search],
	]
	return struct({logo, header, footer, route, style: () => "c_black tc_white ts_2 tf_1"})
}
