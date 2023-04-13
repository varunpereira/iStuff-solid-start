import {write, db, env, res} from "~/config/store"
import product_model from "~/config/db/model/product"
import review_model from "~/config/db/model/review"
import {redirect} from "solid-start/server"

export var POST = async ({request}) => {
	var {_id} = await request.json()
	db()
	var prod = await product_model.findOne({_id})
	if (prod == null) {
		return redirect('/404')
	}
	var review = await review_model.find({
		productId: _id,
	})
	return res({
		prod,
		review,
	})
}
