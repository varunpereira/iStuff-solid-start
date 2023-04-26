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
	path,
} from "~/config/shop"

export default () => {
	var nav = route()
	var path_par = path.par()

	mount(async () => {
		await auth("pub")
		var res = await req("/$/cart/api/paid", {stripe_sesh: path_par.stripe_sesh})
		if (res.paid === true) {
			return nav("/404")
		}
		globe({...globe(), cart_size: 0})
	})

	react(() => {})

	return d(
		{style: () => "fit_2 c_white tc_black"},
		title({}, () => "Payment Success - iStuff"),
		d({}, () => "Payment Success!"),
	)
}
