import { Migration } from '@mikro-orm/migrations';

export class Migration20230809130015 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_profile" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "version" int not null default 1, constraint "user_profile_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "email" varchar(255) not null, "version" int not null default 1, "user_profile_id" uuid null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_user_profile_id_unique" unique ("user_profile_id");');

    this.addSql('alter table "user" add constraint "user_user_profile_id_foreign" foreign key ("user_profile_id") references "user_profile" ("id") on update cascade on delete set null;');
  }

}
