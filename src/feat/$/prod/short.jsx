import {state, mount, react, write, d, t, b, i, p, route, globe, req} from "~/config/store"

export default ({prod}) => {
	var nav = route()

	var cart_put = () => {
		globe({...globe(), cart_qty: globe().cart_qty += 1})
	}

	return d(
		{style: () => "c_white tc_black r_1 w-[12rem] h-[15rem] ts_1"},
		p({value: () => prod.images[0].url, style: () => "h-[6rem] rt_1 w_full e_full"}),
		d(
			{style: () => "p-[1rem]"},
			b({click: () => nav("/prod/" + prod._id), style: () => "hover:underline ta_left"}, () => prod.title),
			t({}, "$" + prod.price),
			b({click: cart_put, style: () => "c_black tc_white r_1 p-[.5rem]"}, () => "Add"),
		),
	)
}
