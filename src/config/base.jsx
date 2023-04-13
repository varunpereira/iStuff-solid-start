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
} from "~/config/store"
import {shop_icon,} from "~/config/asset/icon.jsx"

export default () => {
	var nav = route()

	mount(async () => {
	})

	react(() => {})

	return d(
		{style: () => "fit_2 c_white"},
		title({}, () => "Home - iStuff"),
	)
}
