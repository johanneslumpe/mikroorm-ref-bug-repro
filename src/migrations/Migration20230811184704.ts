import { Migration } from "@mikro-orm/migrations";

export class Migration20230811184704 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" drop constraint "user_user_profile_id_foreign";'
    );

    this.addSql(
      'alter table "user" drop constraint "user_user_profile_id_unique";'
    );
    this.addSql('alter table "user" drop column "user_profile_id";');

    this.addSql(
      'alter table "user_profile" add column "user_id" uuid not null;'
    );
    this.addSql(
      'alter table "user_profile" add constraint "user_profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user_profile" drop constraint "user_profile_user_id_foreign";'
    );

    this.addSql(
      'alter table "user" add column "user_profile_id" uuid null default null;'
    );
    this.addSql(
      'alter table "user" add constraint "user_user_profile_id_foreign" foreign key ("user_profile_id") references "user_profile" ("id") on update cascade on delete set null;'
    );
    this.addSql(
      'alter table "user" add constraint "user_user_profile_id_unique" unique ("user_profile_id");'
    );

    this.addSql('alter table "user_profile" drop column "user_id";');
  }
}
