export default {
  name: process.env.APP_NAME || "My App",
  port: Number(process.env.APP_PORT) || 3000,
  secret: process.env.SECRET || "App Secret",
}
