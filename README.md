# mikro-orm one-to-one collection filter bug (postgres specific)

## Steps to reproduce

Within the context of this repo run the following:

```
npm install
docker compose up -d database

npm run build
npm run database:migrate
npm run create-user
npm run showcase-bug
```
