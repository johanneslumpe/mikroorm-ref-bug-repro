import { Reference, MikroORM, RequestContext } from "@mikro-orm/core";
import { User } from "./entities/user";
import { UserProfile } from "./entities/user-profile";

async function run(): Promise<void> {
  const orm = await MikroORM.init();
  const em = orm.em.fork();

  const user = em.create(User, {
    email: "example@example.com",
    username: "testing",
  });
  await em.flush();

  console.log("User created", user);
  process.exit();
}

run();
