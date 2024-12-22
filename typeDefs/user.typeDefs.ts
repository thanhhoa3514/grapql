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
        code:Integer,
        message: String
    }

    input RegisterUserInput{
        fullname:String!,
        password:String!,
        email:String!
    }
    input LoginUserInput{
        password:String!,
        email:String!
    }
    type Mutation {
        registerUser(user:RegisterUserInput): User
        loginUser(user:LoginUserInput): User
    }
 
`;