import {write, env, res, cookie} from "~/config/shop"
import order_model from "~/config/db/model/order"
import prod_model from "~/config/db/model/prod"
import {db} from '~/config/db/join'

export var POST = async ({request}) => {
	var {email} = cookie(request?.headers?.get("cookie"))
	var {prod} = await request.json()
	db()

	var set_prod = await prod_model.updateOne(
		{_id: prod._id},
		{
			$inc: {sold: -prod.size, stock: prod.size},
		},
	)
	var set_cart = await order_model.updateOne(
		{email, current: true},
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
