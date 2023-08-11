import { Entity, OneToMany, Collection, Property } from "@mikro-orm/core";

import { BaseEntity } from "./base-entity";
import { UserProfile } from "./user-profile";

@Entity()
export class User extends BaseEntity<"version"> {
  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ version: true })
  version!: number;

  @OneToMany(() => UserProfile, (x) => x.user)
  userProfiles = new Collection<UserProfile>(this);
}
