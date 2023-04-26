import {req, write, globe} from "~/config/shop"

export var auth = async (link) => {
	var res = await req("/$/login/api/auth_get")
	write(res?.user)
	if (res?.user != null) return globe({email: res?.user?.email, cart_size: res?.cart_size})
	// globe({sign_down_cart: res?.sign_down_cart})
	link !== "pub" && window.location.pathname !== "/signin" ? (window.location.href = "/signin") : ""
}
