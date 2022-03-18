const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	currency: String,
	locale: String,
	entity: String,
	entityProperty: String,
	type: String,
	flatCharge: Number,
	percCharge: mongoose.Decimal128
});

FeeSchema.index({ locale: 1, entity: 1, entityProperty: 1 });

const Fee = mongoose.model("Fee", FeeSchema);
module.exports = Fee;
