import "reflect-metadata";
import {
  Entity,
  PrimaryKey,
  Property,
  OptionalProps,
  OneToOne,
  Ref,
  MikroORM,
} from "@mikro-orm/core";
import { MikroORM as MikroORMPostgresql } from "@mikro-orm/postgresql";
import { MikroORM as MikroORMSqlite } from "@mikro-orm/sqlite";
import config from "./mikro-orm.config";
import { v4 } from "uuid";
import { User } from "./entities/user";
import { UserProfile } from "./entities/user-profile";

async function test(type: string, orm: MikroORM) {
  console.log("==============");
  console.log("==============");
  console.log("TESTING:", type);
  console.log("==============");
  console.log("==============");
  const em2 = orm.em.fork();
  const [user] = await em2.find(User, {});

  const userProfile = em2.create(UserProfile, {
    firstName: "testing",
    lastName: "testing",
    user,
  });
  await em2.flush();

  // use a fresh em to find the user again with their profile populated
  const em3 = orm.em.fork();
  const userWithProfilePopulated = await em3.findOne(
    User,
    { id: user.id },
    { populate: ["userProfile"] }
  );

  console.log({ userWithProfilePopulated });

  // alternate way of querying for the user just to show that the column really isn't set, as no user will be found
  const userQueriedByProfileColumn = await em3.findOne(
    User,
    { id: user.id, userProfile },
    { populate: true }
  );

  console.log({ userQueriedByProfileColumn });
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
