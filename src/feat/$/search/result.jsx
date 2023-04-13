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
	title,
	req,
	path,
	auth,
} from "~/config/store"
import prod_short from "~/feat/$/prod/short"

export default () => {
	var nav = route()
	var path_par = path().par()
	var prod = state([])

	mount(async () => {
		await auth("pub")
	})

	react(async () => {
		var res = await req("/$/search/api/result", {
			search: path_par.term,
			categ: path_par.categ,
			page: path_par.page,
		})
		prod(res.products)
	})

	return d(
		{style: () => "fit_2 "},
		title({}, () => "Search Results - iStuff"),
		() =>
			prod().length === 0
				? t({}, () => "No results for " + path_par.term)
				: () =>
						d(
							{style:()=>'a_row gap-[2rem]'},
							prod().map((v, k) =>prod_short({prod:v}),),
						),
	)
}
