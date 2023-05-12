import Stripe from "stripe"
import {write, env, res, cookie} from "~/fe/config/shop"
import order_model from "~/fe/config/db/model/order"
import {db} from '~/fe/config/db/join'

export var POST = async ({request}) => {
	var {email} = cookie(request?.headers?.get("cookie"))
	db()
	var {prod} = await request.json()

	var cart = await order_model.findOne({
		email,
		current: true,
	})

	var stripe = new Stripe(env.VITE_stripe, {
		apiVersion: "2020-08-27",
	})
	try {
		var sesh = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: prod,
			success_url:
				"https://" +
				env.VITE_domain +
				'/cart/paid?_id='+
				cart._id +
				"&stripe_sesh={CHECKOUT_SESSION_ID}",
			cancel_url: "https://" + env.VITE_domain + "/cart",
		})
		return res({
			sesh,
		})
	} catch (error) {
		return res({
			message: error.message,
		})
	}
}

	// prod = [
	//   {
	//     price_data: {
	//       currency: 'usd',
	//       product_data: {
	//         name: 'T-shirt',
	//       },
	//       unit_amount: 2000,
	//     },
	//     quantity: 1,
	//   }
	// ]
