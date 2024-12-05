import { gql } from "apollo-server-express";

// Define the GraphQL schema
export const typeDefs = gql`
    type Query {
    hello: String
    }
`;