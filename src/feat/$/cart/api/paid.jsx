import {write, db, env, res, cookie, nav} from "~/config/shop"
import order_model from "~/config/db/model/order"

export var POST = async ({request}) => {
	var {email} = cookie(request?.headers?.get("cookie"))
	var {stripe_sesh} = await request.json()
	db()

	var cart = await order_model.findOne({
		email,
		current: false,
		stripe_sesh,
	})
	if (cart == null) {
		// update cart to paid + add csId
		var pay_cart = await order_model.updateOne(
			{email, current: true},
			{
				current: false,
				stripe_sesh,
			},
		)
		// create new cart
		var put_cart = await new order_model({
			email,
			current: true,
		}).save()
		return res({
			paid: false,
		})
	}
	return res({
		paid: true,
	})
}
