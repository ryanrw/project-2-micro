import dotenv from "dotenv"
import path from "path"

const backendRootPath = path.join(__dirname, "../../")

const EnvFile = dotenv.config()

const noEnvFileFound = EnvFile.error

if (noEnvFileFound) {
  dotenv.config({
    path: path.join(backendRootPath, ".env-sample"),
  })
}

export default {
  backendRootPath,
  secret: process.env.SECRET,
  hostname: process.env.HOSTNAME || `localhost`,
  port: Number(process.env.PORT) || 4000,
}
