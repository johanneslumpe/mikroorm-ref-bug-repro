import { Reference, MikroORM } from "@mikro-orm/core";
import { User } from "./entities/user";
import { UserProfile } from "./entities/user-profile";

async function run(): Promise<void> {
  const orm = await MikroORM.init();
  const em = orm.em.fork();
  const [user] = await em.find(User, {});

  /**
   * As a workaround we can not assign the user to the profile during initial creation, althrough this breaks types
   */
  // @ts-expect-error
  const userProfile = em.create(UserProfile, {
    firstName: "testing",
    lastName: "testing",
  });

  // This first flush is important as it will lead to the user profile becoming managed.
  // This seems to be important for assignment to the user and subsequent database writes to work.
  await em.flush();
  user.userProfile = Reference.create(userProfile);
  await em.flush();

  // use a fresh em to find the user again with their profile populated
  const em2 = orm.em.fork();
  const userWithProfilePopulated = await em2.findOne(
    User,
    { id: user.id },
    { populate: true }
  );

  console.log({ userWithProfilePopulated });

  const userQueriedByProfileColumn = await em2.findOne(
    User,
    { id: user.id, userProfile },
    { populate: true }
  );

  console.log({ userQueriedByProfileColumn });
  process.exit();
}

run();
