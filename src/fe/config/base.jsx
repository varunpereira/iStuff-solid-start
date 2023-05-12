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
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"

export default () => {
	title("Home - iStuff")
	var nav = route()

	mount(async () => {
		await auth("pub")
	})

	react(() => {})

	return d(
		{style: () => "fit_2 c_white tc_black"},
	)
}
