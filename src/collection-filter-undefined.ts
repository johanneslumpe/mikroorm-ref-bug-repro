import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { MikroORM as MikroORMPostgresql } from "@mikro-orm/postgresql";
import { MikroORM as MikroORMSqlite } from "@mikro-orm/sqlite";
import config from "./mikro-orm.config";
import { User } from "./entities/user";

async function test(type: string, orm: MikroORM) {
  console.log("==============");
  console.log("==============");
  console.log("TESTING:", type);
  console.log("==============");
  console.log("==============");
  const em2 = orm.em.fork();
  const user = await em2.findOne(User, {
    userProfiles: {
      firstName: undefined,
    },
  });

  console.log(user);
}

async function runSqlite() {
  const orm = await MikroORMSqlite.init({
    dbName: ":memory:",
    entities: [User],
    debug: true,
  });
  await orm.schema.createSchema();
  const em = orm.em.fork();
  em.create(User, {
    email: "example@example.com",
    username: "testing",
    userProfiles: [
      { firstName: "test", lastName: "a" },
      { firstName: "asd", lastName: "b" },
    ],
  });
  await em.flush();

  await test("sqlite", orm);

  await orm.close(true);
}

async function runPostgres() {
  const orm = await MikroORMPostgresql.init({
    host: "localhost",
    port: 5435,
    user: "postgres",
    password: "postgres",
    debug: true,
    entities: [User],
    dbName: "mikrorepro",
    migrations: {
      path: "build/migrations",
    },
  });

  await test("postgres", orm);

  await orm.close(true);
}

runSqlite().then(runPostgres);
