import {
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
	page,
	timer,
	req,
} from "~/fe/config/shop"
import car1 from "~/fe/generic/asset/1.jpg"
import car2 from "~/fe/generic/asset/2.jpg"
import car3 from "~/fe/generic/asset/3.jpg"
import car4 from "~/fe/generic/asset/4.jpg"
import lotr_vid from "~/fe/generic/asset/lotr_1.mp4"
import lotr from "~/fe/generic/asset/lotr_1.png"
import lotr_logo from "~/fe/generic/asset/lotr_1_logo.png"
import prod_short from "~/fe/prod/short"

export default () => {
	var car = state([car1, car2, car3, car4])
	var car_index = state(0)
	var car_interv = timer.put(() => {
		car_index((i) => {
			if (i == car().length) i = 0
			return (i + 1) % car().length
		})
	}, 3000)
	var nav = route()
	var mute = state(true)
	var logo = state(false)
	var event = state()
	var prod = state([])
	var pages = state()

	var mount = async () => {
		var res = await req("/search/trend")
		prod(res.prod)
	}

	clean(() => {
		timer.cut(car_interv)
	})

	var hover_in = (e) => {
		e.target.play()
		event(e)
		logo(true)
	}

	var hover_out = (e) => {
		e.target.pause()
		event(e)
		logo(false)
	}

	return page(
		{
			title: () => "Home",
			status: () => "pub",
			mount,
		},
		d(
			{style: () => "z_fit"},
			v({
				def: () => lotr,
				value: () => lotr_vid,
				mute,
				rep: () => true,
				hover_in,
				hover_out,
				click: () => mute(!mute()),
				style: () => "fit_3 w_full h-[40vw] e_full",
			}),
			p({
				hover_in: () => {
					event().target.play()
					logo(true)
				},
				hover_out: () => {
					event().target.pause()
					logo(false)
				},
				click: () => mute(!mute()),
				value: () => lotr_logo,
				style: () => "z_put bottom-[.25rem] w-[50%] " + (logo() === true ? "see" : "hide"),
			}),
		),
		t(
			{
				style: () => "fit_1 px-[1rem] py-[1rem] a_row ay_mid mt-[3rem] mb-[2rem] tc_aqua ts_3 tw_2",
			},
			() => "Trending",
		),
		d({style: () => "fit_1 a_row_auto gap-[1rem] mb-[3rem]"}, () =>
			prod().map((v, k) => prod_short({prod: v})),
		),
		p({
			def: () => "trending",
			value: () => car()[car_index()],
			style: () => "fit_3 w_full",
		}),
	)
}
