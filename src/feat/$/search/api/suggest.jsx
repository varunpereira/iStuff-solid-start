import {write, db, env, res} from "~/config/store"
import product_model from "~/config/db/model/product"

export var POST = async ({request}) => {
	var {search, categ, page} = await request.json()
	page = Number(page)
	var products = []
	db()
	if (categ === "All") {
		products = await product_model.find({
			title: {$regex: search, $options: "i"},
			approved: "true",
		})
	} else if (categ === "Tech") {
		products = await product_model.find({
			title: {$regex: search, $options: "i"},
			category: "Tech",
			approved: "true",
		})
	}
	var products_per_page = 8
	var pages = Math.ceil(products.length / products_per_page)
	var lower = products_per_page * (page - 1)
	var upper = products_per_page * page
	products = products.slice(lower, upper)

	return res({
		pages,
		products,
	})
}
