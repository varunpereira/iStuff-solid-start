import {write, db, env, res, cookie} from "~/config/store"
import user_model from "~/config/db/model/user"
import order_model from "~/config/db/model/order"

export var POST = async ({request}) => {
	var {email, token} = cookie(request?.headers?.get("cookie"))
	// write("email: " + email)
	db()
	var user = await user_model.findOne({email, token})
	var cart = await order_model.findOne({email, current: true})
	if (user == null) {
		return res({
			error: "Access denied.",
		})
	}
	return res({user, cart_size: cart.size})
}
