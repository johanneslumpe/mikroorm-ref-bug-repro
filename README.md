# mikro-orm one-to-one reverse reference assigning bug repro

## Steps to reproduce

Within the context of this repo run the following:

```
npm install
docker compose up -d database

npm run build
npm run database:migrate
npm run create-user
npm showcase-bug
```

`create-user` will create a single user in the database outside of the actual test script to simulate an existing user.

`showcase-bug` will:

1. fork the em
2. find an existing user
3. create a new user profile with a reference to the user assigned to it's `user` field
4. flush the em.
5. load the user again and populate the user profile relation

## Expected behavior

The expected behavior is that after step 4 one query is executed to store the new user profile, while another query is executed to write the new user profile id to the user's `user_profile_id` column.

## Observed behavior

Instead of the above, we observe that after step 4 one query is executed to write the user profile. Then another query to update the user is executed, but it does not write the user profile id to the record. This leaves us with a broken relation through reverse assigning.

## Workaround

There is workaround in `workaround.ts`, which can be executed using `npm run showcase-workaround`.

## Notes

Within test runs the combination of `npm run clear-database && npm run create-user` can be used to reset the database state.
