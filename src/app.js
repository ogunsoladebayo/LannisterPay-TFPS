const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

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

//TODO: error handling middleware
app.use(errorHandler);
exports.app = app;
