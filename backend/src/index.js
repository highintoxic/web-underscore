require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const { securityMiddleware, requestLogger } = require("./middleware/index");
const port = 3000;

const { connectDB } = require("./db/index");

const http = require("http");
const server = http.createServer(app);

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});
app.use(securityMiddleware);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(passport.initialize());

app.use("/api", routes);



connectDB().then(() => {
	server.listen(port, "0.0.0.0", () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
});
