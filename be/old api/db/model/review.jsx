import mongoose from 'mongoose'

var schema = new mongoose.Schema(
	{
		prod_id: {
			type: String,
		},
		email: {
			type: String,
		},
		rate: {
			type: Number,
		},
		des: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.models.review || mongoose.model('review', schema, 'review')
