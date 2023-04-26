import {
	state,
	mount,
	react,
	write,
	d,
	t,
	b,
	i,
	v,
	route,
	globe,
	req,
	path,
	title,
} from "~/config/shop"

export default () => {
	var nav = route()
	var path_var = path.var()
	var prod = state(null)
	var review = state([])
	var error = state(null)

	mount(async () => {
		var res = await req("/$/prod/api/get", {
			_id: path_var._id,
		})
		prod(res.prod)
		review(res.review)
	})

	return d(
		{style: () => "fit_2 c_white tc_black"},
		title({}, () => prod()?.title+" - iStuff"),
		()=>prod()?.title,
		()=>review().length
	)
}
