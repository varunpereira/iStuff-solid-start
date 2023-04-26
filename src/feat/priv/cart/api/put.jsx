import {write, env, res, cookie} from "~/config/shop"
import order_model from "~/config/db/model/order"
import prod_model from "~/config/db/model/prod"
import {db} from '~/config/db/join'

export var POST = async ({request}) => {
	var {prod, prod_size} = await request.json()
	var {email} = cookie(request?.headers?.get("cookie"))
	db()

	// after validation
	var set_prod = await prod_model.updateOne(
		{_id: prod._id},
		{
			$inc: {sold: prod_size, stock: -prod_size},
		},
	)
	// cart = current_order
	var cart = await order_model.updateOne(
		{
			email,
			current: true,
			prod: {$elemMatch: {_id: prod._id}},
		},
		{
			$inc: {
				"prod.$.size": prod_size,
				price: prod.price * prod_size,
				size: prod_size,
			},
		},
	)
	if (cart.modifiedCount === 0) {
		cart = await order_model.updateOne(
			{email, current: true},
			{
				$push: {
					prod: {
						_id: prod._id,
						size: prod_size,
						title: prod.title,
						price: prod.price,
					},
				},
				$inc: {
					price: prod.price * prod_size,
					size: prod_size,
				},
			},
		)
	}
	return res({
		cart,
	})
}
