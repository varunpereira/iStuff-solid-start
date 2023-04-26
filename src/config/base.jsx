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
	req,
	title,globe
} from "~/config/shop"
import {auth} from "~/config/auth"

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
