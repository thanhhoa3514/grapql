
import CategoryArticle from "../models/category.model";
import { ICategoryArticle } from "../typeDefs/category.typeDefs";

// Resolvers
export const resolversCategory =  {
    Query: {
        getListCategory:async (): Promise<ICategoryArticle[]> => { 
            
            const category=await CategoryArticle.find({
                deleted: false
            }).lean();
            return category as ICategoryArticle[];
        },
        getCategory: async (_: any, { id }: { id: string }):Promise<ICategoryArticle> =>{
            const category=await CategoryArticle.findById(id);
            return category as ICategoryArticle;
        }

    },
    
    Mutation: {
        createCategory:async (_: any, {category}:{category:ICategoryArticle} ): Promise<ICategoryArticle> => {
            const article = new CategoryArticle(category);
            await article.save();
            return {
               ...category
            };
        },
        updateCategory: async(_: any,{ id, category }: { id: string, category: Partial<ICategoryArticle> }): Promise<ICategoryArticle> => {
            const article = await CategoryArticle.findByIdAndUpdate(id, category, { new: true });
            return article as ICategoryArticle;
        }
    }
};