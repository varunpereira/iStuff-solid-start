import {
	state,
	mount,
	react,
	write,
	d,
	clean,
	t,
	page,
	b,
	i,
	v,
	view,
	route,
	globe,
} from "~/fe/config/shop"

export default () => {
	var nav = route()

	return page(
		{title: () => "404 Error - Page not found", style: () => "fit_1"},
		b({click: () => nav("/"), style: () => "hover:tc_grey"}, () => "Go Home"),
	)
}
