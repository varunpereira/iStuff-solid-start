import {
	state,
	mount,
	react,
	write,
	d,
	clean,
	t,
	b,
	i,
	v,
	view,
	route,
	globe,
	title,
} from "~/fe/config/shop"

export default () => {
	title("404 Error - iStuff")
	var nav = route()
	return d(
		{style: () => "px-[1rem]"},
		t({}, () => "404 Error - Page not found"),
		b({click: () => nav("/"), style: () => "hover:tc_grey"}, () => "Go Home"),
	)
}
