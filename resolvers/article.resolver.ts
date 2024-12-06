import { SortOrder } from "mongoose";

import Article from "../models/article.model";
import CategoryArticle from "../models/category.model";
import { IArticle } from "../typeDefs/article.typeDefs";
import { ICategoryArticle } from "../typeDefs/category.typeDefs";

export const resolversArticle = {
    Query: {

        getListArticle: async (_: any, { sortKey, sortValue }: { sortKey?: string; sortValue?: string }): Promise<IArticle[]> => {

            const sortOptions: { [key: string]: SortOrder } = sortKey && sortValue
                ? { [sortKey]: sortValue === "asc" ? 1 : -1 }
                : {};
            const articles = await Article.find({ deleted: false }).sort(sortOptions as { [key: string]: SortOrder }).lean();
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
        },

    },
    Article: {
        category: async (article: IArticle): Promise<ICategoryArticle[]> => {
            const categoryId = article.category;
            const category = await Article.find({
                _id: categoryId
            });
            return category as ICategoryArticle[];
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
            return article ? {
                _id: article._id.toString(),
                ...input
            } : null;
        },
        deleteArticle: async (_: any, { id }: { id: string }): Promise<boolean> => {
            await Article.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() });
            return true;
        }

    }
};