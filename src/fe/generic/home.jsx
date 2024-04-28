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
import prod_short from "~/fe/prod/short"

export default () => {
	var car = state(Array(8).fill())
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
		<img src={"/" + (car_index() + 1) + ".jpg"} class={"fit_3 w_full"} />,
		t(
			{
				style: () => "fit_1 px-[1rem] py-[1rem] a_row ay_mid mt-[3rem] mb-[2rem] tc_aqua ts_3 tw_2",
			},
			() => "Trending",
		),
		d({style: () => "fit_1 a_row_auto gap-[1rem] mb-[3rem]"}, () =>
			!prod().length ? "Loading..." : () => prod().map((v, k) => prod_short({prod: v})),
		),
	)
}
