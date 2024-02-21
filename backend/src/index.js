// Import libraries
import dotenv from "dotenv";
import mongoose from "mongoose";

// Importing files
import app from "./app.js";
import logger from "./configs/logger.config.js";

// Using dotenv
dotenv.config();

// Environment variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

// Mongodb Connections
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((e) => {
    logger.error(`MongoDB connection error${e}`);
    process.exit(1);
  });

// MongoDB debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

let server = app.listen(PORT, () =>
  logger.info(`Server is listening!!! ${PORT}`)
);

const exitHandler = () => {
  if (server) {
    logger.info("Server closed !!");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedError = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedError);
process.on("unhandledRejection", unexpectedError);

// Sigterm
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed !!");
    process.exit(1);
  }
});