import mongoose from "mongoose";
import express from "express";
import config from "./config/main.js";
import router from "./routes/routes.js";

(async function () {
  try {
    const res = await mongoose.connect(config.mongo);
  } catch (err) {
    console.log(err);
    return;
  }
  console.log("MongoDB started...");
  const app = express();
  app.use(express.json());
  app.use(router);
  app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });
  process.on("SIGINT", () => {
    console.log("Bye");
    process.exit();
  });
})();
