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
import {cut_icon} from "~/config/asset/icon"

export default () => {
	var nav = route()
	var cart = state({})
	var flaw = state()
	var test = state()

	mount(async () => {
		await auth("pub")
		var res = await req("/$/cart/api/get")
		cart(res.cart)
	})

	var cut = async (prod) => {
		var res = await req("/$/cart/api/cut", {
			prod,
		})
		if (res?.error != null) {
			return
		}
		cart(res.cart)
		globe({...globe(), cart_size: (globe().cart_size -= prod.size)})
	}

	var put = async (prod) => {
		if (prod.stock === 0) {
			return flaw("This product is out of stock.")
		}
		var res = await req("/$/cart/api/put", {
			prod,
			prod_size: prod.size,
		})
		if (res?.error != null) {
			return
		}
		cart(res.cart)
		globe({...globe(), cart_size: (globe().cart_size += prod.size)})
	}

	return d(
		{style: () => "fit_1 c_white tc_black p-[2rem]"},
		title({}, () => "Cart - iStuff"),
		t({style: () => "ts_4 tw_2"}, () => "Cart: " + cart()?.size + " products"),
		() =>
			cart()?.prod?.map((v, k) =>
				d(
					{style: () => "a_row_auto"},
					t({style: () => "w-[20rem]"}, () => v.title),
					d({style: () => ""}, "-" + v.size + "+"),
					t({style: () => "w-[10rem]"}, () => "$" + v.price),
					b({click: () => cut(v)}, cut_icon({style: () => "w-[1.4rem] h-[1.4rem] hover:tc_grey"})),
				),
			),
		t({style: () => "ts_4 tw_2"}, () => "Total: $" + cart()?.price),
	)
}
