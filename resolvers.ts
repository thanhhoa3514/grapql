import Article from "./models/article.model";
import { IArticle } from "./typeDefs";
// 
export const resolvers =  {
    Query: {
        hello: () => "Hello, world!",
        getListArticle: async (): Promise<IArticle[]> => {
            const articles = await Article.find({ deleted: false }).lean();
            return articles.map(article => ({
                ...article,
                _id: article._id.toString()
            }));
        },
        getArticleById: async (_: any, { id }: { id: string }): Promise<IArticle | null> => {
            const article = await Article.findById(id);
            return article ? {
                ...article.toObject(),
                _id: article._id.toString()
            } : null;
        }
    },
    Mutation: {
        addArticle: async (_: any, { input }: { input: IArticle }): Promise<IArticle> => {
            const article = new Article(input);
            await article.save();
            return {
                _id: article._id.toString(),
               ...input
            };
        },
        updateArticle: async (_: any, { id, input }: { id: string, input: Partial<IArticle> }): Promise<IArticle | null> => {
            const article = await Article.findByIdAndUpdate(id, input, { new: true });
            return article? {
                _id: article._id.toString(),
               ...input
            } : null;
        },
        deleteArticle: async (_: any, { id }: { id: string }): Promise<boolean> => {
            await Article.findByIdAndUpdate(id, { deleted: true });
            return true;
        }
    }
};