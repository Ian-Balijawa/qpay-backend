import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { app } from "./app";
import { QPEY_KEYS, MOMO_KEYS } from "./config/keys";
const { COLLECTIONS, COLLECTION_WIDGET, REMITANCES } = MOMO_KEYS;
const {
  SECRET_KEY,
  JWT_KEY,
  MONGO_URI,
  REDIS_URI,
  COOKIE_SECRET,
  SERVER_PORT,
} = QPEY_KEYS;

const start = async (): Promise<void> | never => {
  if (!COLLECTIONS?.PRI_KEY || !COLLECTIONS?.SEC_KEY) {
    throw new Error(
      "COLLECTIONS PRIMARY_KEY and SECONDARY_KEY Must be defined"
    );
  }
  if (!COLLECTION_WIDGET?.PRI_KEY || !COLLECTION_WIDGET?.SEC_KEY) {
    throw new Error(
      "COLLECTION_WIDGET PRIMARY_KEY and SECONDARY_KEY Must be defined"
    );
  }
  if (!REMITANCES?.PRI_KEY || !REMITANCES?.SEC_KEY) {
    throw new Error("REMITANCES PRIMARY_KEY and SECONDARY_KEY Must be defined");
  }
  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }
  if (!REDIS_URI) {
    throw new Error("REDIS_URI must be defined!");
  }
  if (!COOKIE_SECRET) {
    throw new Error("COOKIE_SECRET must be defined");
  }
  if (!SECRET_KEY) {
    throw new Error("API_KEY must be defined");
  }

  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to Database!"))
    .catch((err) => console.log(err));

    // await mongoose.connection.dropCollection("users")
};

start();

process.on("uncaughtException", (err) => {
  console.log("Error: ", err);
  return err;
});
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err);
});
process.on("uncaughtExceptionMonitor", (err) => {
  console.log("Error: ", err);
});

const PORT = process.env.PORT || SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
