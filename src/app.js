const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const helmet = require("helmet");

//TODO: Route files

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

//TODO: Mount routers

//TODO: error handling middleware

module.exports = app;
