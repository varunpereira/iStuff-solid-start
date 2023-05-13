import {write, env, res, cookie} from "~/be/config/shop"
import user_model from "~/be/config/db/model/user"
import order_model from "~/be/config/db/model/order"
import {db} from "~/be/config/db/join"

export var POST = async ({request}) => {
	write(cookie(request?.headers?.get("cookie")))
	var {email, token} = cookie(request?.headers?.get("cookie"))
	db()
	var user = await user_model.findOne({email, token})
	var cart = await order_model.findOne({email, token, current: true})
	if (user != null) {
		return res({
			user,
			cart_size: cart.size,
		})
	}
	var user_exist = await user_model.findOne({email})
	// check if user exists but signed out
	if (user_exist != null && email != null) {
		return res({
			user,
			cart_size: cart.size,
		})
	}
	// user doesnt exist, so create one
	var put_user = await new user_model({
		email: null,
		token: null,
	}).save()
	var get_user = await user_model.updateOne(
		{_id: put_user._id},
		{
			$set: {
				token: put_user._id,
			},
		},
	)
	var put_cart = await new order_model({
		email: null,
		token: put_user._id,
		current: true,
	}).save()
	var value = {email: null, token: put_user._id, cart_size:0}
	var age = 30 * 24 * 60 * 60 // 30 days
	// user needs to refresh page for cookie to load
	return res(value, {cookie: {value, age}})
}
