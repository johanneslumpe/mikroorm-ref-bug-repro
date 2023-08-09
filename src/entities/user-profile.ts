import { Entity, OneToOne, Property, Ref } from "@mikro-orm/core";

import { BaseEntity } from "./base-entity";
import { User } from "./user";

@Entity()
export class UserProfile extends BaseEntity<"version"> {
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ version: true })
  version!: number;

  @OneToOne(() => User, { mappedBy: "userProfile", ref: true })
  user!: Ref<User>;
}
