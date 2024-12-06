import { gql } from "apollo-server-express";
export interface IArticle {
    _id?: string,
    title?: string,
    avatar?: string,
    description?: string,
    deleted?: boolean;

}
// Define the GraphQL schema
export const typeDefs = gql`

    type Article{
        id:ID!,
        title: String,
        avatar: String,
        description: String,

    }

    type Query {
        hello: String,
        getListArticle:[Article]
        getArticleById(id:ID):Article
    }
    input ArticleInput{
        title:String!,
        avatar:String,
        description:String!
    }
    type Mutation {
        addArticle(article:ArticleInput): Article
        updateArticle(id:ID!, title:String!, avatar:String, description:String!): Article
        deleteArticle(id:ID!): Boolean
    }
 
`;