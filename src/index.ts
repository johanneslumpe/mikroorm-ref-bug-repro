import { Reference, MikroORM } from "@mikro-orm/core";
import { User } from "./entities/user";
import { UserProfile } from "./entities/user-profile";
import { assert } from "console";

async function run(): Promise<void> {
  const orm = await MikroORM.init();
  const em = orm.em.fork();
  const [user] = await em.find(User, {});

  const userProfile = em.create(UserProfile, {
    firstName: "testing",
    lastName: "testing",
    user: Reference.create(user),
  });
  await em.flush();

  // use a fresh em to find the user again with their profile populated
  const em2 = orm.em.fork();
  const userWithProfilePopulated = await em2.findOne(
    User,
    { id: user.id },
    { populate: ["userProfile"] }
  );

  console.log({ userWithProfilePopulated });

  // alternate way of querying for the user just to show that the column really isn't set, as no user will be found
  const userQueriedByProfileColumn = await em2.findOne(
    User,
    { id: user.id, userProfile },
    { populate: true }
  );

  console.log({ userQueriedByProfileColumn });

  process.exit();
}

run();
