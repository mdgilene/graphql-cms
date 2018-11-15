import dotenv from "dotenv";
dotenv.config();

import { makeExecutableSchema } from "graphql-tools";
import graphqlHTTP from "express-graphql";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "express-jwt";
import mongoose from "mongoose";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { directiveResolvers } from "./graphql/directives";
import { getContext } from "./graphql/context";

mongoose
  .connect(
    `mongodb://${process.env["mongo.user"]}:${process.env["mongo.pass"]}@${
      process.env["mongo.host"]
    }`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongodb"));

const app = express();

// auth middleware
const auth = jwt({
  secret: process.env["jwt.secret"] as string,
  credentialsRequired: false
});

app.use(cookieParser());
app.use(bodyParser.json(), auth);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers
});

app.use(
  "/graphql",
  graphqlHTTP(async (req: any, res: any) => ({
    schema,
    context: await getContext(req, res),
    graphiql: true
  }))
);

app.listen(process.env.port, () =>
  console.log(`Server ready at http://localhost:${process.env.port}/graphiql`)
);
