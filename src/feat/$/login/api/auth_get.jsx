import {write, db, env, res,} from "~/config/store"
import user_model from "~/config/db/model/user"
import order_model from "~/config/db/model/order"
import {parseCookie} from "solid-start"

export var POST = async ({request}) => {
	var cookies = () => parseCookie(String(request?.headers?.get("cookie")))
	// write("cookies!:\n" + JSON.stringify(cookies()))
	var cookie = cookies()?.cookie ? JSON.parse(cookies()?.cookie) : null
	db()
	var user = await user_model.findOne({email: cookie?.email, token: cookie?.token})
	var cart = await order_model.findOne({email: cookie?.email, current: true,})
	if (user == null) {
		return res({
			error: "Access denied.",
		})
	}
	return res({user,cart_size:cart.size})
}
