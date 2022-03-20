const { Fee } = require("../models");

module.exports = async (locale, currency, paymentEntity) => {
	const propertyParams = {
		$in: [paymentEntity.ID, paymentEntity.Issuer, paymentEntity.Brand, paymentEntity.Number, paymentEntity.SixID]
	};

	// All possible combinations in order of priority
	let fee = await Fee.findOne({
		currency: currency,
		locale: locale,
		entity: paymentEntity.Type,
		entityProperty: propertyParams
	}).lean();

	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: locale,
			entity: paymentEntity.Type,
			entityProperty: "*"
		}).lean();
	}
	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: locale,
			entity: "*",
			entityProperty: propertyParams
		}).lean();
	}
	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: locale,
			entity: "*",
			entityProperty: "*"
		}).lean();
	}
	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: "*",
			entity: paymentEntity.Type,
			entityProperty: propertyParams
		}).lean();
	}
	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: "*",
			entity: paymentEntity.Type,
			entityProperty: "*"
		}).lean();
	}
	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: "*",
			entity: "*",
			entityProperty: propertyParams
		}).lean();
	}
	if (!fee) {
		fee = await Fee.findOne({
			currency: currency,
			locale: "*",
			entity: "*",
			entityProperty: "*"
		}).lean();
	}

	return fee;
};
