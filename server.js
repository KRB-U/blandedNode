import { app } from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`start serv on ${PORT} port`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
