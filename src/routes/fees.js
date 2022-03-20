const express = require("express");
const { feesController, feesComputeController } = require("../controllers/fees");

const router = new express.Router();

router.post("/fees/", feesController).post("/compute-transaction-fee/", feesComputeController);
module.exports = router;
