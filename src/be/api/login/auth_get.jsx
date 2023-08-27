import {write, env, res, cookie} from "~/be/config/shop"
import user_model from "~/be/config/db/model/user"
import order_model from "~/be/config/db/model/order"
import {db} from "~/be/config/db/join"
import jwt from "jsonwebtoken"

export var POST = async ({request}) => {
	// write(cookie(request?.headers?.get("cookie")))
	var {email, token} = cookie(request?.headers?.get("cookie"))
	db()
	var user = await user_model.findOne({email, token})
	var cart = await order_model.findOne({email, current: true})
	if (user != null) {
		return res({
			user,
			cart_size: cart.size,
		})
	}
	// public user - sign up
	var put_pub_user = await new user_model().save()
	// prefix to know which email is public in fe
	email = "@" 
	email += jwt.sign({email: put_pub_user._id}, env.VITE_sesh, {
		expiresIn: "1d",
	})
	var get_user = await user_model.updateOne(
		{_id: put_pub_user._id},
		{
			$set: {
				email,
			},
		},
	)
	var put_cart = await new order_model({
		email,
		current: true,
	}).save()
	var value = {email, cart_size: 0}
	var age = 30 * 24 * 60 * 60 // 30 days
	// user needs to refresh page for cookie to load
	return res(value, {cookie: {value, age}})
}
