import mongoose from 'mongoose'

var schema = new mongoose.Schema(
	{
		email1: {
			type: Object,
			required: true,
		},
		email2: {
			type: Object,
			required: true,
		},
		msg: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	},
)

export default mongoose.models.chat || mongoose.model('chat', schema, 'chat')
