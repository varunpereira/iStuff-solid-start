import mongoose from 'mongoose'

var schema = new mongoose.Schema(
	{
		email: {
			type: String,
		},
		current: {
			type: Boolean,
			default: false,
		},
		prod: {
			type: Array,
			default: [],
		},
		price: {
			type: Number,
			default: 0,
		},
		size: {
			type: Number,
			default: 0,
		},
		stripe_sesh: {
			type: String,
			default: null,
		},
		refund: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.models.order || mongoose.model('order', schema, 'order')
