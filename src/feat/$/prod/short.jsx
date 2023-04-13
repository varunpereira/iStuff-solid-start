import {state, mount, react, write, d, t, b, i, route, globe, req} from "~/config/store"
import {shop_icon} from "~/config/asset/icon.jsx"

export default ({prod}) => {
	var nav = route()
	write(prod)

	return d(
		{style: () => "c_white tc_black r_1 w-[10rem] h-[15rem]"},
		b({click: () => nav("/prod/" + prod._id)}, () => prod.title),
	)
}
