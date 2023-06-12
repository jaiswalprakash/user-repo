const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
			lowercase: true
		},
		phone: {
			type: Number,
			trim: true,
			unique: true,
			required: true
		},
		address: {
			type: String,
			trim: true,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("users", UserSchema);
