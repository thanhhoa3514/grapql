import { gql } from "apollo-server-express";

export interface ICategoryArticle {

    title: string;
    avatar?: string;
    deleted: boolean;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
// Define the GraphQL schema
export const typeDefsCategory = gql`

    
    type Category{
        id:ID,
        title: String,
        avatar: String,
    }

    type Query {

        getListCategory:[Category]
        getCategory(id:ID):Category
    }
    
    input CategoryInput{
        title:String,
        avatar:String,

    }
    type Mutation {
        createCategory(category:CategoryInput): Category
        updateCategory(id:ID!,category:CategoryInput ): Article
    }
 
`;