import {
	state,
	mount,
	react,
	write,
	d,
	t,
	b,
	i,
	v,
	p,
	route,
	globe,
	req,
	path,
	title,
	str,
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"

export default () => {
	var nav = route()
	var path_var = path.var()
	var prod = state(null)
	var review = state([])
	var error = state(null)
	var pic_pick = state(0)

	mount(async () => {
		await auth("pub")
		var res = await req("/prod/get", {
			_id: path_var._id,
		})
		prod(res.prod)
		review(res.review)
	})

	return d(
		{style: () => "fit_2 c_white tc_black"},
		title(prod()?.title + " - iStuff"),
		d(
			{style: () => "a_row_auto"},
			d({}, () =>
				prod()?.pic.map((v, k) =>
					b(
						{click: () => pic_pick(k), style:()=>'a_col ay_equal gap-[1rem]'},
						p({value: () => v.url, style: () => "w-[4rem] h-[4rem] e_fit bw_1 bc_black r_1"}),
					),
				),
			),
			p({value: () => prod()?.pic[pic_pick()]?.url, style: () => "w-[30rem] h-[30rem] e_fit mr-[1rem] bw_1 bc_black r_1"}),
			d(
				{style: () => ""},
				t({}, () => prod()?.title),
				t({}, () => "View Reviews"),
				t({}, () => "$" + prod()?.price),
				t({style: () => ""}, () => "Description:"),
				t({style: () => ""}, () => prod()?.des),
				t({style: () => ""}, () => "Sold: " + prod()?.sold),
				t({style: () => ""}, () => "Stock: " + prod()?.stock),
				t({style: () => ""}, () => "Seller: " + prod()?.email),
			),
		),
		d(
			{style: () => ""},
			t({}, () => "Reviews"),
			t({}, () => "Add Review"),
			t({}, () => review().length + " reviews."),
		),
	)
}
