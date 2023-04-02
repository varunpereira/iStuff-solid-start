import mongoose from "mongoose"

var schema = new mongoose.Schema(
	{
		email: {
			type: String,
		},
		token: {type: String},
		password: {
			type: String,
		},
		role: {
			type: String,
			default: "customer",
		},
		contacts: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	},
)
export default mongoose.models?.user || mongoose.model("user", schema, "user")
