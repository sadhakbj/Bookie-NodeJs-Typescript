import { AppDataSource } from "@/database/data-source";
import * as dotenv from "dotenv";
import "reflect-metadata";

import app from "@/app";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection success");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
