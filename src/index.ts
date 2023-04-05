import { QPEY_KEYS } from "./config/keys";
import { app } from "./app";
import mongoose from "mongoose";

const { SECRET_KEY, JWT_KEY, MONGO_URI, SERVER_PORT } = QPEY_KEYS;

const start = async function (): Promise<void> | never {
  if (!JWT_KEY) {
    console.error("JWT_KEY must be defined!");
    process.exit(1);
  }
  if (!MONGO_URI) {
    console.error("MONGO_URI must be defined!");
    process.exit(1);
  }
  if (!SECRET_KEY) {
    console.error("API_KEY must be defined");
    process.exit(1);
  }

  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to Database!"))
    .catch((err) => console.log(err));
};

start();

process.on("uncaughtException", (err) => {
  throw new Error((err as Error).message);
});
process.on("unhandledRejection", (err) => {
  throw new Error((err as Error).message);
});
process.on("uncaughtExceptionMonitor", (err) => {
  throw new Error((err as Error).message);
});

const PORT = process.env.PORT || SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
