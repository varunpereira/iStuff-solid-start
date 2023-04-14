import {write, db, env, res, nav} from "~/config/store"
import product_model from "~/config/db/model/prod"
import review_model from "~/config/db/model/review"

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
