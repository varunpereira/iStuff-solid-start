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
	num
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"
import review_short from "~/fe/prod/review/short"

export default () => {
	var nav = route()
	var path_var = path.var()
	var prod = state(null)
	var review = state([])
	var error = state(null)
	var pic_pick = state(0)
	var flaw = state("")
	var size = state(1)

	mount(async () => {
		await auth("pub")
		var res = await req("/prod/get", {
			_id: path_var._id,
		})
		prod(res.prod)
		review(res.review)
	})

	var cart_put = async () => {
		var res = await req("/cart/put", {
			prod: prod(),
			prod_size: size(),
		})
		return globe({...globe(), cart_size: (globe().cart_size += size())})
	}

	var inc = () => {
		size() < prod().stock && size(size() + 1)
	}
	var dec = () => {
		size() >= 1 && size(size() - 1)
	}

	var size_input = (e) => {
		var value = e.target.value
		var regex = /^\d+$/
		if (!regex.test(value)) {
			return flaw("Natural numbers only.")
		}
		if (value > prod().stock) {
			return flaw("Max allowed " + prod().stock + ".")
		}
		flaw('')
		size(num(value))
	}

	return d(
		{style: () => "fit_1 c_white tc_black"},
		title({}, () => prod()?.title + " - iStuff"),
		d(
			{style: () => "a_row_auto v2:mb-[1rem] v3:mb-[2rem]"},
			d(
				{style: () => "a_row"},
				d({style: () => "mr-[.5rem] a_col ay_equal gap-[.5rem]"}, () =>
					prod()?.pic.map((v, k) =>
						b(
							{click: () => pic_pick(k), style: () => ""},
							p({value: () => v.url, style: () => "w-[3rem] h-[3rem] e_fit bw_1 bc_black r_1"}),
						),
					),
				),
				p({
					value: () => prod()?.pic[pic_pick()]?.url,
					style: () => "v2:w-[20.5rem] v2:h-[20.5rem] v3:w-[30rem] v3:h-[30rem] e_fit mr-[1rem] bw_1 bc_black r_1",
				}),
			),
			d(
				{style: () => "w-[20rem] v2:mt-[1rem] v3:mt-[0rem]"},
				t({style: () => "tw_1 ts_3"}, () => prod()?.title),
				t({}, () => "View Reviews"),
				t({style: () => "tw_1 ts_3 mb-[1rem]"}, () => "$" + prod()?.price),
				t({style: () => ""}, () => "Description:"),
				t({style: () => ""}, () => prod()?.des),
				t({style: () => ""}, () => "Sold: " + prod()?.sold),
				t({style: () => ""}, () => "Stock: " + prod()?.stock),
				t({style: () => "mb-[1rem]"}, () => "Seller: " + prod()?.email),
				d(
					{style: () => "a_row mb-[1rem]"},
					b({click: dec, style:()=>'mr-[.4rem] tw_1 ts_3'}, () => "-"),
					i({
						value: () => size(),
						input: size_input,
						style: () => "w-[3.5rem] bw_1 bc_black r_1 mr-[.25rem] ta_mid",
					}),
					b({click: inc,style:()=>'tw_1 ts_3'}, () => "+"),
				),
				b({click: cart_put, style: () => "c_black tc_white r_1 p-[.5rem] mb-[1rem]"}, () => "Add"),
				t({style: () => "h-[1rem] tc_red"}, () => flaw()),
			),
		),
		d(
			{style: () => ""},
			t({style: () => "tw_1 ts_3"}, () => "Reviews"),
			t({}, () => "Add Review"),
			t({style: () => "mb-[1rem]"}, () => review().length + " reviews."),
			d({style: () => "a_row_auto gap-[1rem]"}, () =>
				review().map((v, k) => review_short({review: v})),
			),
		),
	)
}
