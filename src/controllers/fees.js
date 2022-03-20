const asyncHandler = require("../middlewares/async");
const fcsParser = require("../utils/fcsParser");
const ErrorResponse = require("../utils/errorResponse");
const transactionFcsSelector = require("../utils/transactionFcsSelector");
const validator = require("validator");
const { Fee } = require("../models");

/**
 *  @desc      Fees Controller to parse and store fee configuration spec
 *  @route     POST /fees
 *  @access    Public
 * */
exports.feesController = asyncHandler(async (req, res, next) => {
	const { FeeConfigurationSpec } = req.body;
	if (!FeeConfigurationSpec) return next(new ErrorResponse("Please pass body property 'FeeConfigurationSpec'", 400));

	const parsedFcs = fcsParser(FeeConfigurationSpec);

	await Fee.create(...parsedFcs);

	res.status(200).json({ status: "ok" });
});

exports.feesComputeController = asyncHandler(async (req, res, next) => {
	["ID", "Amount", "Currency", "CurrencyCountry", "Customer", "PaymentEntity"].forEach((key) => {
		if (!req.body[key]) return next(new ErrorResponse(`Missing key '${key}' in request payload!`));
	});

	const {
		Amount: transactionAmount,
		Currency: transactionCurrency,
		CurrencyCountry: transactionCountry,
		Customer: customer,
		PaymentEntity: paymentEntity
	} = req.body;

	if (typeof customer.BearsFee != "boolean") {
		return next(new ErrorResponse("Missing valid boolean value for key 'customer.BearsFee'", 400));
	}

	if (!paymentEntity.Country) {
		return next(new ErrorResponse("Missing key 'paymentEntity.Country' in request payload!", 400));
	}

	const paymentEntityTypeOptions = ["CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID"];
	if (!paymentEntity.Type || !validator.isIn(paymentEntity.Type, paymentEntityTypeOptions))
		return next(new ErrorResponse("Value for key 'PaymentEntity.Type' is not valid!", 400));

	const locale = transactionCountry === paymentEntity.Country ? "LOCL" : "INTL";

	const fee = await transactionFcsSelector(locale, transactionCurrency, paymentEntity);
	if (!fee) return next(new ErrorResponse("No fee configuration found for the given transaction!", 400));

	const { id, type, flatCharge, percCharge } = fee;

	let appliedFeeValue;

	switch (type) {
		case "FLAT_PERC":
			appliedFeeValue = flatCharge + (percCharge / 100).toPrecision(6) * transactionAmount;
			break;
		case "PERC":
			appliedFeeValue = (percCharge / 100).toPrecision(6) * transactionAmount;
			break;
		default:
			appliedFeeValue = flatCharge;
	}

	const chargeAmount = customer.BearsFee ? transactionAmount + appliedFeeValue : transactionAmount;
	const settlementAmount = chargeAmount - appliedFeeValue;

	res.status(200).json({
		AppliedFeeID: id,
		AppliedFeeValue: appliedFeeValue,
		ChargeAmount: chargeAmount,
		SettlementAmount: settlementAmount
	});
});
