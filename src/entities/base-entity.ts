import { OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

import { v4 } from "uuid";

export abstract class BaseEntity<OptionalProps = never> {
  [OptionalProps]?: OptionalProps | "createdAt" | "updatedAt";

  @PrimaryKey({ columnType: "uuid" })
  id: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
