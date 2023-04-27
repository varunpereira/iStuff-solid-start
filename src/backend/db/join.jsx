import {write, env, } from "~/config/shop"
import mongoose from "mongoose"

export var db = () =>
	mongoose.connections[0].readyState
		? () => write("mongodb already connected.")
		: mongoose.connect(env.VITE_db).then(() => write("mongodb connected."))