# Blood Donation API

This is a GraphQL API that provides blood donations management.

# Technologies
Node.js
Express.js
GraphQL
Prisma ORM
TypeGraphQL

# How to start the server 
- npm i
- npx prisma generate
- npx prisma migrate dev
- npm run dev

# How to test
After starting the server, you can test the GraphQL endpoint by visiting http://localhost:3333/graphql, which will open the GraphQL Playground.

If you need to use Prisma Studio, change the env database_url to localhost instead of db("postgresql://postgres:postgres@db:5432/db_name?schema=public" to "postgresql://postgres:postgres@localhost:5432/db_name?schema=public"), because it does not recognize "db" outside of Docker, and inside of Docker, you can't expose Prisma Studio port.