import {
	state,
	mount,
	react,
	write,
	d,
	t,
	b,
	i,
	route,
	globe,
	req,
	title,
	auth
} from "~/config/shop"

export default () => {
	var nav = route()

	mount(async () => {
		await auth("pub")
	})

	react(() => {})

	return d(
		{style: () => "fit_2 c_white tc_black"},
		title({}, () => "Home - iStuff"),
	)
}
