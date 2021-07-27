import mongoose from "mongoose";
import logger from "../logger/winstonLogger";

let database: mongoose.Connection;

export const connect = () => {
  const uri = "mongodb://127.0.0.1"; // Should be use in configutaion file
  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once("open", async () => {
    logger.log("info","Connected to database");
  });
  database.on("error", () => {
    logger.log("error","Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};