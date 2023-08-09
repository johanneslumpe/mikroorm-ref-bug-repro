import { Entity, OneToOne, Property, Ref } from "@mikro-orm/core";

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

  @OneToOne(() => UserProfile, {
    inversedBy: "user",
    ref: true,
    nullable: true,
  })
  userProfile?: Ref<UserProfile>;
}
