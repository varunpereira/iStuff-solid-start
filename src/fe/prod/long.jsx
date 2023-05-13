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
import review_short from '~/fe/prod/review/short'

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
		{style: () => "fit_1 c_white tc_black"},
		title({}, () => prod()?.title + " - iStuff"),
		d(
			{style: () => "a_row_auto mb-[2rem]"},
			d(
				{style: () => "a_row"},
				d({style:()=>'mr-[1rem] a_col ay_equal gap-[.5rem]'}, () =>
					prod()?.pic.map((v, k) =>
						b(
							{click: () => pic_pick(k), style: () => ""},
							p({value: () => v.url, style: () => "w-[3rem] h-[3rem] e_fit bw_1 bc_black r_1"}),
						),
					),
				),
				p({
					value: () => prod()?.pic[pic_pick()]?.url,
					style: () => "w-[30rem] h-[30rem] e_fit mr-[1rem] bw_1 bc_black r_1",
				}),
			),
			d(
				{style: () => "w-[20rem]"},
				t({style:()=>'tw_1 ts_3'}, () => prod()?.title),
				t({}, () => "View Reviews"),
				t({style:()=>'tw_1 ts_3'}, () => "$" + prod()?.price),
				t({style: () => ""}, () => "Description:"),
				t({style: () => ""}, () => prod()?.des),
				t({style: () => ""}, () => "Sold: " + prod()?.sold),
				t({style: () => ""}, () => "Stock: " + prod()?.stock),
				t({style: () => ""}, () => "Seller: " + prod()?.email),
			),
		),
		d(
			{style: () => ""},
			t({style:()=>'tw_1 ts_3'}, () => "Reviews"),
			t({}, () => "Add Review"),
			t({style:() => "mb-[1rem]"}, () => review().length + " reviews."),
			d(
				{style: () => "a_row_auto gap-[1rem]"},
				()=>review().map((v, k) => review_short({review: v})),
			),
		),
	)
}
