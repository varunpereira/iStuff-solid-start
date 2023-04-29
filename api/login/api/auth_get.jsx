import {write, env, res, cookie} from "~/config/shop"
import user_model from "~/config/db/model/user"
import order_model from "~/config/db/model/order"
import {db} from '~/config/db/join'

export var POST = async ({request}) => {
	var {email, token, sign_down_cart} = cookie(request?.headers?.get("cookie"))
	db()
	var user = await user_model.findOne({email, token})
	var cart = await order_model.findOne({email, current: true})
	if (user != null) {
		return res({
			user,
			cart_size: cart.size,
		})
	} else if (sign_down_cart != null) {
		return res({sign_down_cart})
	}
	var value = {sign_down_cart: {prod: [], size: 0, price: 0}}
	var age = 30 * 24 * 60 * 60 // 30 days
	// user needs to refresh page for cookie to load
	return res(value, {cookie: {value, age}})
}
