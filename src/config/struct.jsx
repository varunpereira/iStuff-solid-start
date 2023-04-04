// @refresh reload
import {struct} from "~/config/store"
import header from "~/config/header"
import footer from "~/config/footer"
import def from "~/config/def"
import home from "~/config/home/home"
import sign_in from "~/feat/$/login/sign_in"
import chat from "~/feat/$/pusher/chat"

export default () => {
	var route = () => [
		{path: "/", piece: home},
		{path: "/signin", piece: sign_in},
		{path: "/chat", piece: chat},
	]
	return struct({header, footer, def, route, style: () => "c_black tc_white ts_1 tf_1"})
}
