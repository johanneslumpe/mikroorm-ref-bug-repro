import { defineConfig } from "@mikro-orm/postgresql";

export default defineConfig({
  host: "localhost",
  port: 5435,
  user: "postgres",
  password: "postgres",
  debug: true,
  entitiesTs: ["./src/entities/*.ts"],
  entities: ["./build/entities/*.js"],
  dbName: "mikrorepro",
  migrations: {
    path: "build/migrations",
    pathTs: "src/migrations",
  },
});
