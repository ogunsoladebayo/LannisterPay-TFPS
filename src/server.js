const { app } = require("./app");

// Port Normalization
const normalizePort = (val) => {
	const port = parseInt(val, 10);
	if (!Number.isNaN(port)) {
		return val;
	}

	if (port > 0) {
		return port;
	}
	console.log("Unspecified port, defaulting to 3000");
	return 3000;
};
// set the port
const port = normalizePort(process.env.PORT);

// http server
const server = app.listen(port, () => {
	const address = server.address();
	const bind = typeof host === "string" ? `pipe ${address}` : `port: ${port}`;
	console.log(`Running in ${process.env.NODE_ENV} mode on ${bind}`.white.inverse);
});
