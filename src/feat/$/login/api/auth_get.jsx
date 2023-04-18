import {write, db, env, res, cookie} from "~/config/store"
import user_model from "~/config/db/model/user"
import order_model from "~/config/db/model/order"
import jwt from "jsonwebtoken"

export var POST = async ({request}) => {
	var {email, token} = cookie(request?.headers?.get("cookie"))
	db()
	var user = await user_model.findOne({email, token})
	var cart = await order_model.findOne({email, current: true})
	if (user != null) {
		return res({user, cart_size: cart.size})
	}
	var put_cart = await new order_model({
		email,
		current: true,
	}).save()
	// write(put_cart._id)
	var token = jwt.sign({value: put_cart._id}, env.VITE_sesh, {
		expiresIn: "30d",
	})
	var value = {email, token}
	var age = 30 * 24 * 60 * 60 // 30 days
	return res({error: "user not signed in."}, {cookie: {value, age}})
}
