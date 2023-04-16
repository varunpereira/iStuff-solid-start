import Stripe from "stripe"
import {write, db, env, res} from "~/config/store"

export var POST = async ({request}) => {
	var stripe = new Stripe(env.VITE_stripe, {
		apiVersion: "2020-08-27",
	})

	var {_id, prod} = await request.json()

	try {
		var sesh = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: prod ?? [],
			success_url:
				env.VITE_domain + "/cart/paid?_id=" + _id + "checkout_session_id={CHECKOUT_SESSION_ID}",
			cancel_url: env.VITE_domain + "/cart",
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
