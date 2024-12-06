import { gql } from "apollo-server-express";
export interface IArticle {
    _id?: string,
    title?: string,
    avatar?: string,
    description?: string,
    deleted?: boolean;
    category?: string

}
export interface ICategoryArticle {

    title: string;
    avatar?: string;
    deleted: boolean;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
// Define the GraphQL schema
export const typeDefs = gql`

    type Article{
        id:ID!,
        title: String,
        avatar: String,
        description: String,
        category:Category
    }
    type Category{
        id:ID,
        title: String,
        avatar: String,
    }

    type Query {
        hello: String,
        getListArticle:[Article]
        getArticleById(id:ID):Article
        getListCategory:[Category]
        getCategory(id:ID):Category
    }
    input ArticleInput{
        title:String!,
        avatar:String,

        description:String!
    }

    input CategoryInput{
        title:String,
        avatar:String,

    }
    type Mutation {
        addArticle(article:ArticleInput): Article
        updateArticle(id:ID!, title:String!, avatar:String, description:String!): Article
        deleteArticle(id:ID!): Boolean
        createCategory(category:CategoryInput): Category
        updateCategory(id:ID!,category:CategoryInput ): Article
    }
 
`;