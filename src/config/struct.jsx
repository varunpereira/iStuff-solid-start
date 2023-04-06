// @refresh reload
import {struct} from "~/config/store"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/config/def"
import home from "~/config/home/home"
import sign_in from "~/feat/$/login/sign_in"
import chat from "~/feat/$/pusher/chat"
import home2 from "~/config/home/home2"

export default () => {
	var route = () => [
		["/", home],
		["/signin", sign_in],
		["/chat", chat],
		['/home2', home2],
	]
	return struct({header, footer, def, route, style: () => "c_black tc_white ts_1 tf_1"})
}
