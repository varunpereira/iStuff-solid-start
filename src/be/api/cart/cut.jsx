import {write, env, res, cookie} from "~/be/config/shop"
import order_model from "~/be/config/db/model/order"
import prod_model from "~/be/config/db/model/prod"
import {db} from "~/be/config/db/join"

export var POST = async ({request}) => {
	var {email, token} = cookie(request?.headers?.get("cookie"))
	var {prod} = await request.json()
	db()

	var set_prod = await prod_model.updateOne(
		{_id: prod._id},
		{
			$inc: {sold: -prod.size, stock: prod.size},
		},
	)
	var set_cart = await order_model.updateOne(
		{email, token, current: true},
		{
			$pull: {prod: {_id: prod._id}},
			$inc: {
				price: -prod.price * prod.size,
				size: -prod.size,
			},
		},
	)
	var cart = await order_model.findOne({
		email,
		token,
		current: true,
	})
	if (set_cart.modifiedCount === 0) {
		return res({
			error: "No current order found for that email.",
		})
	}
	return res({
		cart,
	})
}
