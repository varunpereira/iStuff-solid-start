import {
	title,
	state,
	react,
	mount,
	clean,
	write,
	route,
	d,
	t,
	b,
	v,
	p,
	timer,
	globe,
} from "~/fe/config/shop"
import {auth} from "~/fe/config/auth"
import car1 from "~/fe/generic/asset/1.jpg"
import car2 from "~/fe/generic/asset/2.jpg"
import car3 from "~/fe/generic/asset/3.jpg"
import car4 from "~/fe/generic/asset/4.jpg"
import lotr_vid from "~/fe/generic/asset/lotr_2.mp4"
import lotr from "~/fe/generic/asset/lotr_2.png"

export default () => {
	var car = state([car1, car2, car3, car4])
	var car_index = state(0)
	var car_interv = timer.put(() => {
		car_index((i) => (i + 1) % car().length)
	}, 3000)
	var nav = route()
	var mute = state(true)

	mount(async () => {
		await auth("pub")
	})

	clean(() => {
		timer.cut(car_interv)
	})

	return d(
		{},
		title({}, () => "Home"),
		v({
			def: () => lotr,
			value: () => lotr_vid,
			mute: () => mute(),
			hover_in: (e) => e.target.play(),
			hover_out: (e) => e.target.pause(),
			click: () => mute(false),
			style: () => "fit_3 w_full",
		}),
		t(
			{
				style: () =>
					"fit_1 px-[1rem] py-[1rem] a_row ay_mid my-[3rem] tc_aqua ts_3 tw_2",
			},
			() => "Trending",
		),
		p({
			def: () => "trending",
			value: () => car()[car_index()],
			style: () => "fit_3 w_full",
		}),
	)
}
