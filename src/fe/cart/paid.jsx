import {
	state,
	
	react,
	write,
	d,
	t,
	b,
	i,
	route,
	req,
	page,
	path, globe
} from "~/fe/config/shop"


export default () => {
	var nav = route()
	var path_par = path.par()

	var mount = async () => {


		var res = await req("/cart/paid", {stripe_sesh: path_par.stripe_sesh})
		if (res.paid === true) {
			return nav("/404")
		}
		globe({...globe(), cart_size: 0})
	}

	react(() => {})

	return page(
		{title: ()=>"Payment Success", mount, style: () => "fit_1 c_white tc_black"},
		d({}, () => "Payment Success!"),
	)
}
