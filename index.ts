import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import {  ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers  } from "./resolvers";
dotenv.config();
database.connect();
const app: Express = express();
const port: string | number = process.env.PORT || 3000;

// GraphQl




async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({
        app: app as any,
        path: "/graphql",
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

startServer();
