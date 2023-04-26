import {write, env, res, cookie} from "~/config/shop"
import order_model from "~/config/db/model/order"
import {db} from '~/config/db/join'

export var POST = async ({request}) => {
	var {email} = cookie(request?.headers?.get("cookie"))
  db()
	
	var cart = await order_model.findOne({
		email,
		current: true,
	})

	return res({
		cart,
	})
}
