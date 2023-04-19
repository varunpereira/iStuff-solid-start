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

	mount(async () => {
		await auth("pub")
		if (globe().email != null) {
			var res = await req("/$/cart/api/get")
			return cart(res.cart)
		}
		cart(globe().sign_down_cart)
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

	var pay = async () => {
		if (cart().size <= 0) {
			return flaw('Cart empty. Please add a product.')
		}
		var prod = cart().prod.map((v) =>{
			return {
				name: v.title,
				description: v._id,
				amount: v.price * 100,
				quantity: v.size,
				currency: 'aud',
			}
		})
		var res = await req('/$/cart/api/stripe', {
			prod,
		})
		write(res)
		window.location.href = res?.sesh?.url
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
		b({click:pay,style: () => "r_1 p-[.5rem] c_black tc_white"}, () => "Pay"),
		t({style: () => "tc_red h-[2rem]"}, () => flaw()),
	)
}
