import app from "@/app"
import appConfig from "@/config/app"
import { AppDataSource } from "@/database/data-source"
import * as dotenv from "dotenv"
import "reflect-metadata"

dotenv.config()

const PORT = process.env.APP_PORT || 3000

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection success")
  })
  .catch((err) => console.log(err))

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`)
})
