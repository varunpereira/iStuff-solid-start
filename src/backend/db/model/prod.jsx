import mongoose from 'mongoose'

var schema = new mongoose.Schema(
	{
		email: {
			type: String,
		},
		title: {
			type: String,
			trim: true,
		},
		des: {
			type: String,
		},
		price: {
			type: Number,
			default: 0,
		},
		pic: {
			type: Array,
		},
		theme: {
			type: String,
		},
		stock: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		approve: {
			type: String,
			default: 'false',
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.models.prod || mongoose.model('prod', schema, 'prod')
