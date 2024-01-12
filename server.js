import { app } from "./app.js";
import mongoose from "mongoose";

import { DB_HOST, PORT } from "./envConfig.js";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`start serv on ${PORT} port`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
