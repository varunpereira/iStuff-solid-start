import {write, db, env, res, cookie} from "~/config/store"
import order_model from "~/config/db/model/order"

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
