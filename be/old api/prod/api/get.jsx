import {write, env, res, nav} from "~/fe/config/shop"
import product_model from "~/fe/config/db/model/prod"
import review_model from "~/fe/config/db/model/review"
import {db} from '~/fe/config/db/join'

export var POST = async ({request}) => {
	var {_id} = await request.json()
	db()
	var prod = await product_model.findOne({_id})
	if (prod == null) {
		return nav('/404')
	}
	var review = await review_model.find({
		productId: _id,
	})
	return res({
		prod,
		review,
	})
}
