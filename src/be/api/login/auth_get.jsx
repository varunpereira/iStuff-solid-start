import {write, env, res, cookie} from "~/be/config/shop"
import user_model from "~/be/config/db/model/user"
import order_model from "~/be/config/db/model/order"
import {db} from "~/be/config/db/join"

export var POST = async ({request}) => {
	write(cookie(request?.headers?.get("cookie")))
	var {email, token, cart_size} = cookie(request?.headers?.get("cookie"))
	db()
	var user = await user_model.findOne({email, token})
	var cart = await order_model.findOne({email, current: true})
	if (user != null) {
		return res({
			user,
			cart_size: cart.size,
		})
	} else if (cart_size != null) {
		return res({user, cart_size})
	}
	var value = {user, cart_size: 0}
	var age = 30 * 24 * 60 * 60 // 30 days
	// user needs to refresh page for cookie to load
	return res(value, {cookie: {value, age}})
}
