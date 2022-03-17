const validator = require("validator");
const ErrorResponse = require("./errorResponse");

const fcsParser = (fcsString) => {
	//initialize checks
	// let dualFeeValue = false;
	// let theFlatValue = null;
	// let thePercValue = null;
	// let theSingleFeeValue = null;

	//valid payment entities
	// const validPaymentEntities = ["CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID", "*"];

	if (typeof fcsString !== "string" || validator.isEmpty(fcsString, { ignore_whitespace: true }))
		throw new ErrorResponse("Fee configuration spec must be a string with valid characters!", 400);
	const fcss = fcsString.split("\n");
	// const data = [];
	fcss.forEach((fcs) => {
		const [feeId, feeCurrency, feeLocale, feeEntityEntityProp, colon, applyKeyword, feeType, feeValue] =
			fcs.split(" ");
		if (
			!feeId ||
			!feeCurrency ||
			!feeLocale ||
			!feeEntityEntityProp ||
			!colon ||
			!applyKeyword ||
			!feeType ||
			!feeValue
		) {
			throw new ErrorResponse(
				"One or more FCS passed is not in the correct format!Valid syntax: {FEE-ID} {FEE-CURRENCY} {FEE-LOCALE} {FEE-ENTITY}({ENTITY-PROPERTY}) : APPLY {FEE-TYPE} {FEE-VALUE}",
				400
			);
		}
		//validate FEE-ID
		if (!(validator.isAlphanumeric(feeId) && feeId.length === 8)) {
			return new ErrorResponse("One or more FEE-ID is not valid!", 400);
		}
		// 	//validate apply keyword
		// 	if (!feeConfig.includes("APPLY")) return { error: true, message: "Invalid payload format" };

		// 	const [feeID, feeCurrency, feeLocale, feeEntityPart, colon, space] = feeDet1.split(" ");
		// 	const [empty, feeType, feeValue] = feeDet2.split(" ");

		// 	//validate fields

		// 	if (colon !== ":" || space != "" || empty != "") return { error: true, message: "Invalid payload format" };

		// 	//validating fee currency
		// 	if (!(feeCurrency === "NGN" || feeCurrency === "USD" || feeCurrency === "*"))
		// 		return feeParserError("{FEE-CURRENCY}");

		// 	//validate fee locale
		// 	if (!(feeLocale === "LOCL" || feeLocale === "INTL" || feeLocale === "*"))
		// 		return feeParserError("{FEE-LOCALE}");

		// 	//validate fee entity and entity property field
		// 	const [feeEntity, entityProperty] = feeEntityPart.slice(0, feeEntityPart.length - 1).split("(");
		// 	//fee entity
		// 	if (!validPaymentEntities.includes(feeEntity)) return feeParserError("{FEE-ENTITY}");
		// 	//fee entity property
		// 	if (!entityProperty) return feeParserError("{ENTITY-PROPERTY}");

		// 	//validate fee type
		// 	if (!(feeType === "FLAT" || feeType === "PERC" || feeType === "FLAT_PERC"))
		// 		return feeParserError("{FEE-TYPE}");

		// 	//validate fee value
		// 	if (!feeValue) return feeParserError("{FEE-VALUE}");

		// 	if (feeValue.includes(":")) {
		// 		//does the fee value matches the fee type?
		// 		if (feeType !== "FLAT_PERC") return { error: true, message: "FEE-VALUE unsupported for the FEE-TYPE" };

		// 		//validate the value
		// 		dualFeeValue = true;
		// 		const [flatValue, percValue] = feeValue.split(":");
		// 		if (isNaN(flatValue) || isNaN(percValue)) return feeParserError("{FEE-VALUE}");
		// 		theFlatValue = +flatValue;
		// 		thePercValue = +percValue;
		// 		theSingleFeeValue = null;
		// 	} else {
		// 		//does the fee value matches the fee type?
		// 		if (!(feeType === "FLAT" || feeType === "PERC"))
		// 			return { error: true, message: "FEE-VALUE unsupported for the FEE-TYPE" };

		// 		//validate the value
		// 		if (!feeValue || isNaN(feeValue) || feeValue < 0) return feeParserError("{FEE-VALUE}");
		// 		theSingleFeeValue = +feeValue;
		// 		theFlatValue = null;
		// 		thePercValue = null;
		// 	}

		// 	//validation passed
		// 	const obj = {
		// 		feeID,
		// 		feeCurrency,
		// 		feeLocale,
		// 		feeEntity,
		// 		entityProperty,
		// 		feeType,
		// 		flatValue: theFlatValue,
		// 		percValue: thePercValue,
		// 		feeValue: theSingleFeeValue
		// 	};

		// 	data.push(obj);
	});

	// return { error: false, data };
};

module.exports = fcsParser;
