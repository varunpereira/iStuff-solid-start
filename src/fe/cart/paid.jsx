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
	title,
	path, globe
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"

export default () => {
	title("Payment Success - iStuff")
	var nav = route()
	var path_par = path.par()

	mount(async () => {
		await auth("pub")
		var res = await req("/cart/paid", {stripe_sesh: path_par.stripe_sesh})
		if (res.paid === true) {
			return nav("/404")
		}
		globe({...globe(), cart_size: 0})
	})

	react(() => {})

	return d(
		{style: () => "fit_2 c_white tc_black"},
		d({}, () => "Payment Success!"),
	)
}
