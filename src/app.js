const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// env
dotenv.config();

// DB connection
connectDB();

//TODO: Route files
const feesRouter = require("./routes/fees");

const app = express();

// dev logger
app.use(morgan("tiny"));

// Set Security HTTP Headers
app.use(helmet());

// enable CORS
app.use(cors());

// express body parser
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);

//TODO: Mount routers
app.use("/", feesRouter);

const options = {
	swaggerDefinition: {
		info: {
			title: "LANNISTERPAY TFPS API",
			version: "1.0.0",
			description:
				"A NGN (Nigerian Naira) fee processing service for a fictional Payment Processor (LannisterPay)"
		},
		openapi: "3.0.0"
	},
	apis: ["swagger.yaml"]
};

const specs = swaggerJSDoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

//TODO: error handling middleware
app.use(errorHandler);
exports.app = app;
