import { gql } from "apollo-server-express";
export interface IArticle {
    _id?: string,
    title?: string,
    avatar?: string,
    description?: string,
    deleted?: boolean;
    category?: string

}

// Define the GraphQL schema
export const typeDefsArticle = gql`

    type Article{
        id:ID!,
        title: String,
        avatar: String,
        description: String,
        category:Category
    }
   

    type Query {

        getListArticle(
            sortKey:String,
            sortValue:String,
            currentPage:Int =1,
            limitPage:Int =2,
            filterKey:String,
            filterValue:String,
            keyWords:String
        ):[Article]
        getArticleById(id:ID):Article

    }
    input ArticleInput{
        title:String!,
        avatar:String,
        description:String!,
        categoryId:String!
    }

    
    type Mutation {
        addArticle(article:ArticleInput): Article
        updateArticle(id:ID!, title:String!, avatar:String, description:String!): Article
        deleteArticle(id:ID!): Boolean

    }
 
`;