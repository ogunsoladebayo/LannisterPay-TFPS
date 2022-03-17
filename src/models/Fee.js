const mongoose = require("mongoose");
const { db } = require("../app");

const FeeSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	currency: String,
	locale: String,
	entity: String,
	entityProperty: String,
	type: String,
	value: String
});

FeeSchema.index({ locale: 1, entity: 1, entityProperty: 1 });

module.exports = db.model("Fee", FeeSchema);
