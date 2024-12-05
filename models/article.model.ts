import mongoose from "mongoose";
interface IArticle {
    title: string;
    avatar?: string;
    description: string;
    deleted?: boolean;
    deletedAt?: Date;
}

const articleSchema = new mongoose.Schema<IArticle>(
    {
        title: { type: String, required: true, trim: true },
        avatar: { type: String, trim: true },
        description: { type: String, required: true },
        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

const Article = mongoose.model<IArticle>("Article", articleSchema, "articles");

export default Article;
