import Stripe from "stripe"
import {write, db, env, res} from "~/config/store"

export var POST = async ({request}) => {
	var stripe = new Stripe(env.stripe, {
		apiVersion: "2020-08-27",
	})

	var {_id, items} = await request.json()

	try {
		var session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: items ?? [],
			success_url:
				env.domain + "/cart/paid?_id=" + _id + "checkout_session_id={CHECKOUT_SESSION_ID}",
			cancel_url: env.domain + "/cart",
		})
		return res({
			session,
		})
	} catch (error) {
		return res({
			message: error.message,
		})
	}
}
