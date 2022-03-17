const express = require("express");
const { feesController } = require("../controllers/fees");

const router = new express.Router();

router.post("/", feesController);
module.exports = router;
