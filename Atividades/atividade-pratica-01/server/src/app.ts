import 'reflect-metadata'
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { resolvers } from "@generated/type-graphql";
import dotenv from "dotenv";
const app = express();
import { buildSchema } from "type-graphql";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const schema = await buildSchema({
  resolvers,
  validate: false,
});
dotenv.config();

var root = {
  hello: () => {
    return 'Hello world!';
  },
};


app.use('/graphql', graphqlHTTP({
  schema:  schema,
  rootValue: root,
  graphiql: true,
  context: {prisma: prisma}
}));


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

