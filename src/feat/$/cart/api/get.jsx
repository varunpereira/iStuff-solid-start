import {write, db, env, res} from "~/config/store"
import order_model from "~/config/db/model/order"

export var POST = async ({request}) => {
	var { email } = await request.json()
  db()
  
	var cart = await order_model.findOne({
		email: email,
		current: true,
	})

	return res({
		cart,
	})
}
