const validator = require("validator");
const ErrorResponse = require("./errorResponse");

const result = [];
const fcsParser = (fcsString) => {
	if (typeof fcsString !== "string" || validator.isEmpty(fcsString, { ignore_whitespace: true }))
		throw new ErrorResponse("Fee configuration spec must be a string with valid characters!", 400);
	const fcss = fcsString.split("\n");
	// const data = [];
	const feeCurrencyOptions = ["NGN", "*"];
	const feeLocaleOptions = ["LOCL", "INTL", "*"];
	const feeEntityOptions = ["CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID", "*"];
	const feeTypeOptions = ["FLAT", "PERC", "FLAT_PERC"];
	fcss.forEach((fcs) => {
		const [feeId, feeCurrency, feeLocale, feeEntityEntityProp, colon, applyKeyword, feeType, feeValue] =
			fcs.split(" ");
		// validate FCS syntax
		if (
			!feeId ||
			!feeCurrency ||
			!feeLocale ||
			!feeEntityEntityProp ||
			colon !== ":" ||
			applyKeyword !== "APPLY" ||
			!feeType ||
			!feeValue
		) {
			throw new ErrorResponse(
				"One or more FCS passed is not in the correct format! Valid syntax: {FEE-ID} {FEE-CURRENCY} {FEE-LOCALE} {FEE-ENTITY}({ENTITY-PROPERTY}) : APPLY {FEE-TYPE} {FEE-VALUE}",
				400
			);
		}
		//validate fee entity and entity property syntax
		const [feeEntity, entityProperty] = feeEntityEntityProp.slice(0, feeEntityEntityProp.length - 1).split("(");
		if (
			validator.isEmpty(feeEntity, { ignore_whitespace: true }) ||
			validator.isEmpty(entityProperty, { ignore_whitespace: true })
		)
			throw new ErrorResponse(
				"One or more FCS passed is not in the correct format! Valid syntax: {FEE-ID} {FEE-CURRENCY} {FEE-LOCALE} {FEE-ENTITY}({ENTITY-PROPERTY}) : APPLY {FEE-TYPE} {FEE-VALUE}",
				400
			);
		//validate FEE-ID
		if (!(validator.isAlphanumeric(feeId) && feeId.length === 8)) {
			throw new ErrorResponse("One or more FEE-ID value(s) is not valid!", 400);
		}
		//validate FEE-CURRENCY
		if (!validator.isIn(feeCurrency, feeCurrencyOptions))
			throw new ErrorResponse("One or more FEE-CURRENCY value(s) is not valid!", 400);
		//validate FEE-LOCALE
		if (!validator.isIn(feeLocale, feeLocaleOptions))
			throw new ErrorResponse("One or more FEE-LOCALE value(s) is not valid!", 400);
		//validate FEE-ENTITY
		if (!validator.isIn(feeEntity, feeEntityOptions))
			throw new ErrorResponse("One or more FEE-ENTITY value(s) is not valid!", 400);
		//validate FEE-TYPE
		if (!validator.isIn(feeType, feeTypeOptions))
			throw new ErrorResponse("One or more FEE-TYPE value(s) is not valid!", 400);
		//validate FEE-VALUE
		if (feeType === "FLAT_PERC") {
			const [flatFee, percValue] = feeValue.split(":");
			if (!flatFee || !validator.isDecimal(flatFee) || flatFee < 0)
				throw new ErrorResponse(
					"One or more FEE-VALUE value(s) is not valid for the specified FEE-TYPE value!",
					400
				);
			if (!percValue || !validator.isDecimal(percValue) || percValue < 0)
				throw new ErrorResponse(
					"One or more PERC-VALUE value(s) is not valid for the specified FEE-TYPE value!",
					400
				);
		} else {
			if (!validator.isDecimal(feeValue) || feeValue < 0)
				throw new ErrorResponse(
					"One or more FEE-VALUE value(s) is not valid for the specified FEE-TYPE value!",
					400
				);
		}

		const parsedFcs = {
			feeID,
			feeCurrency,
			feeLocale,
			feeEntity,
			entityProperty,
			feeType,
			flatValue: theFlatValue,
			percValue: thePercValue,
			feeValue: theSingleFeeValue
		};

		result.push(parsedFcs);
	});

	return data;
};

module.exports = fcsParser;
