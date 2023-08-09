import { Reference, MikroORM, RequestContext } from "@mikro-orm/core";
import { User } from "./entities/user";
import { UserProfile } from "./entities/user-profile";

async function run(): Promise<void> {
  const orm = await MikroORM.init();
  const em = orm.em.fork();

  await em.nativeDelete(User, "");
  await em.nativeDelete(UserProfile, "");
  process.exit();
}

run();
