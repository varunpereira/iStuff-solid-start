import {req, write, globe, nav_full, path} from "~/fe/config/shop"

export var auth = async (link) => {
	try {
		var res = await req("/login/auth_get")
		write(res?.user)
		return globe({email: !res?.user?.email?.startsWith("@") ? res?.user?.email : null, cart_size: res?.cart_size})
	} catch (flaw) {
		write(flaw)
	}
	var path_get = path.get()
	link !== "pub" && path_get !== "/signin" ? nav_full("/signin") : ""
}
