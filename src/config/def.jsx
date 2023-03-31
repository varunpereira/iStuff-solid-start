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
	parse,
	route,
	globe,
	db,
	title,
} from "~/config/store"

export default () => {
	var nav = route()
	return d(
		{style: () => "px-[1rem]"},
		title({value: () => "404 Error"}),
		t({}, () => "404 Error - Page not found"),
		b({click: () => nav("/"), style: () => "hover:tc_grey"}, () => "Go Home"),
	)
}
