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
import batman_pic from '~/config/asset/batman.jpg'

export default () => {
	var car = state([batman_pic, "/home/2.jpg",])
	var car_index = state(0)
	// var car_interv = timer.put(() => {
	// 	car_index(car_index()+1)
	// }, 3000)
	var nav = route()
	var mute = state(true)

	mount(async () => {
		await auth("pub")
	})

	clean(() => {
		// timer.cut(car_interv)
	})

	// react(() => write(car_index()))

	return d(
		{style: () => "fit_2 c_white tc_black"},
		title({}, () => "Home - iStuff"),
		// ()=>car_index()
	)
}
