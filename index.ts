import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import {  ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typDefs";
import { resolvers } from "./resolvers/index.resolver";
import { authenticateToken } from "./middlewares/auth.middleware";
import { CustomContext } from "./types/context";

import cors from "cors";
// GraphQl
async function startServer() {
    dotenv.config();
    database.connect();
    const app: Express = express();
    const port: string | number = process.env.PORT || 3000;
    app.use(cors());
    app.use(express.json());
    //app.use(authenticateToken);


    const server = new ApolloServer({
        typeDefs:typeDefs,
        resolvers:resolvers,
        introspection: true,
        context: async ({ req }): Promise<CustomContext> => {
            // Get token from authorization header
            const token = req.headers.authorization?.split(" ")[1] || "";
            return {
                token,
                req
            };
        },
        formatError: (error) => {
            // Log server errors
            console.error('GraphQL Error:', error);
            
            // Return formatted error to client
            return {
                message: error.message,
                code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
                locations: error.locations,
                path: error.path,
            };
        },
    });

    await server.start();
    server.applyMiddleware({
        app: app as any,
        path: "/graphql",
    });
    app.use("/api", authenticateToken  as express.RequestHandler);
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

startServer();
