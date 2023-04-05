import {
	title,
	state,
	react,
	mount,
	clean,
	write,
	d,
	t,
	b,
	route,
	v,
	p,
	timer,
	globe,
	auth,
} from "~/config/store2"
import batman_p from "~/config/home/asset/batman.jpg"

export default () => {
	var car = state([batman_p, "/home.jpg"])
	var car_index = state(0)
	var car_interv = timer().put(() => {
		car_index((i) => (i + 1) % car().length)
	}, 2000)

	clean(() => {
		timer().cut(car_interv)
	})

	return d(
		() => ({style:  "fit_2 c_white"}),
		() => (
			title({}, () => "Home2"),
			p({
				value: car()[car_index()],
				style: "w-[100%]",
			})
		),
	)
}
