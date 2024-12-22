import { gql } from "apollo-server-express";

export interface IUserService {
    fullname: string;
    password: string;
    token?: string;
    email: string;
    deleted?: boolean;
    deletedAt?: Date | null;
}
// Define the GraphQL schema
export const typeDefsUser = gql`
    type User{
        id:ID,
        fullname: String,
        token: String,
        email: String,
        
    }
    type AuthResponse {
        code: Int!
        message: String!
        id: ID
        fullname: String
        email: String
        token: String
    }
    type Query {
        getUser(id:ID): AuthResponse!
    }
    

    input RegisterUserInput {
        fullname: String!
        email: String!
        password: String!
    }
    input LoginUserInput {
        email: String!
        password: String!
    }
    type Mutation {
        # Register new user
        registerUser(user: RegisterUserInput!): AuthResponse!
        
        # Login existing user
        loginUser(user: LoginUserInput!): AuthResponse!
        
        # Update user profile
        updateUser(id: ID!, user: RegisterUserInput!): AuthResponse!
        
        # Soft delete user
        deleteUser(id: ID!): AuthResponse!
    }
 
`;