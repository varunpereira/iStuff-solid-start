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
	str,
	nav_full,
} from "~/fe/config/shop"
import {cut_icon} from "~/fe/config/asset/icon"
import {auth} from "~/fe/config/auth"

export default () => {
	var nav = route()
	var cart = state({})
	var flaw = state()

	mount(async () => {
		await auth("pub")
		var res = await req("/cart/get")
		return cart(res.cart)
	})

	var cut = async (prod) => {
		var res = await req("/cart/cut", {
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
		var res = await req("/cart/put", {
			prod,
			prod_size: prod.size,
		})
		if (res?.error != null) {
			return
		}
		cart(res.cart)
		globe({...globe(), cart_size: (globe().cart_size += prod.size)})
	}

	var pay = async () => {
		if (cart().size <= 0) {
			return flaw("Cart empty. Please add a product.")
		}
		var prod = cart().prod.map((v) => {
			return {
				name: v.title,
				description: v._id,
				amount: v.price * 100,
				quantity: v.size,
				currency: "aud",
			}
		})
		var res = await req("/cart/stripe", {
			prod,
		})
		write(res)
		nav_full(res?.sesh?.url)
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
		b({click: pay, style: () => "r_1 p-[.5rem] c_black tc_white"}, () => "Pay"),
		t({style: () => "tc_red h-[2rem]"}, () => flaw()),
	)
}
