const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");

//TODO: Route files
const feesRouter = require("./routes/fees");

// env
dotenv.config();

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

connectDB().then((db) => (exports.db = db));

//TODO: Mount routers
app.use("/fees", feesRouter);

//TODO: error handling middleware
app.use(errorHandler);
exports.app = app;
