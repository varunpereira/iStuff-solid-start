// @refresh reload
import {struct} from "~/config/store"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/config/def"
import home from "~/config/home/home"
import sign_in from "~/feat/$/login/sign_in"
import chat from "~/feat/$/pusher/chat"
import favicon from "~/config/asset/favicon.gif"

export default () => {
	var route = () => [
		["*", def],
		["/", home],
		["/signin", sign_in],
		["/chat", chat],
	]
	return struct({header, favicon, footer, route, style: () => "c_black tc_white ts_1 tf_1"})
}
