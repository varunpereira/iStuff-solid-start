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
	var nav = route()
	return d(
		{style: () => "px-[1rem]"},
	title({},()=>"404 Error"),
		t({}, () => "404 Error - Page not found"),
		b({click: () => nav("/"), style: () => "hover:tc_grey"}, () => "Go Home"),
	)
}
