// Importing libraries
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import fileUpload from "express-fileupload";
import mongoSanitize from "express-mongo-sanitize";

// Importing routers
import routes from "./routes/index.js";

// Create express app
const app = express();

app.use((req, res, next) => {
    console.log('Request Body TESTING :', req.body);
    next();
  });

// Morgan
if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
  });

// Helmet
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse json request url
app.use(express.urlencoded({ extend: true }));

// Sanitize req data
app.use(mongoSanitize());

// Cookie parser
app.use(cookieParser());

// Gzip compression
app.use(compression());

// File upload
app.use(fileUpload({
	useTempFiles: true,
}));

// cors
app.use(cors());

// Routes
app.use("/api/v1",routes);




app.use(async (req, res, next) => {
	next(createHttpError.NotFound("This route does not exist."));
});


// Error handling
app.use(async (err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
});


export default app;