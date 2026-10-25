import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "src/.env") });

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
