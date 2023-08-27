import {
	state,
	mount,
	react,
	write,
	d,
	clean,
	t,
	b,
	i,
	v,
	view,
	route,
	globe,
	title,
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"

export default () => {
	var nav = route()

	mount(async () => {
		await auth("pub")
	})

	return d(
		{style: () => "fit_1"},
		title({}, () => "404 Error"),
		t({}, () => "404 Error - Page not found"),
		b({click: () => nav("/"), style: () => "hover:tc_grey"}, () => "Go Home"),
	)
}
