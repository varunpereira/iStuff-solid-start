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
  auth,
	str,
} from "~/config/store"

export default () => {
	var nav = route()
	var cart = state({})

	mount(async () => {
		await auth("pub")
		var res = await req("/$/cart/api/get", {
			email: globe().email,
		})
		cart(res.cart)
		write(cart())
	})
	react(() => {})

	return d(
		{style: () => "fit_2 c_white tc_black"},
		title({}, () => "Cart - iStuff"),
		() => str((cart())),
	)
}
