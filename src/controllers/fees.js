const asyncHandler = require("../middlewares/async");
const fcsParser = require("../utils/fcsParser");
const ErrorResponse = require("../utils/errorResponse");
/**
 *  @desc      Fees Controller to parse and store fee configuration spec
 *  @route     POST /fees
 *  @access    Public
 * */
exports.feesController = asyncHandler(async (req, res, next) => {
	const { FeeConfigurationSpec } = req.body;
	if (!FeeConfigurationSpec) return next(new ErrorResponse("Please pass body property 'FeeConfigurationSpec'", 400));

	fcsParser(FeeConfigurationSpec);

	res.status(200).json({ status: "ok" });
});