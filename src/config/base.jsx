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
	parse,
	route,
	globe,
	req,
} from "~/config/store"
import {shop_icon, menu_icon} from "~/config/asset/icon.jsx"

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
