import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";

import typeDefs from "./schema.js";

import dotenv from "dotenv";

import express from "express";

import http from "http";

import path from "path";

const port = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose.connect(process.env.MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("server connected to db");
});

mongoose.connection.on("error", (error) => {
  console.log("err here", error);
});

import QuoteModel from "./Models/Quotes.js";
import UserModel from "./Models/User.js";

import resolvers from "./resolver.js";

const server = new ApolloServer({
  typeDefs,
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      try {
        const userId = jwt.verify(authorization, process.env.JWT_SECRET);
        return userId;
      } catch {
        return {};
      }
    }
  },
  resolvers,
  plugins: [
    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

const __dirname = path.resolve();

if(process.env.NODE_ENV=="production") {
  app.use(express.static('client/build'));
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

httpServer.listen({ port }, () => {
  console.log(`listening ${port} on ${server.graphqlPath}`);
});