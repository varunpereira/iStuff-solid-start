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
	db,
	v,
	p,
	timer,
	globe,
	auth,
} from "~/config/store"
import {Title} from "solid-start"

export default () => {
	var car = state(["/home/1.jpg", "/home/2.jpg", "/home/3.jpg", "/home/4.jpg"])
	var car_index = state(0)
	var car_interv = timer().put(() => {
		car_index((i) => (i + 1) % car().length)
	}, 3000)
	var nav = route()
	var mute = state(true)

	mount(async () => {
		await auth("pub")
	})

	clean(() => {
		timer().cut(car_interv)
	})

	var play = (e) => {
		e.target.play()
	}

	var pause = (e) => {
		e.target.pause()
	}
	return d(
		{},
		title({}, () => "Home - iStuff"),
	)
	// return d(
	// 	{style:()=>'fit_2 c_white'},
	// 	title({value: () => "Home"}),
	// 	v({
	// 		def: () => "/home/lotr_2.png",
	// 		value: () => "/home/lotr_2.mp4",
	// 		mute: () => mute(),
	// 		hover_in: play,
	// 		hover_out: pause,
	// 		style: () => "w-[100%]",
	// 		click: () => mute(false)
	// 	}),
	// 	t(
	// 		{
	// 			style: () =>
	// 				"fit_1 px-[1rem] py-[1rem] contain a_row ax_left ay_mid my-[3rem] tc_aqua ts_2 tw_1",
	// 		},
	// 		() => "Trending",
	// 	),
	// 	p({
	// 		def: () => "trending",
	// 		value: () => car()[car_index()],
	// 		style: () => "w-[100%]",
	// 	}),
	// )
}
