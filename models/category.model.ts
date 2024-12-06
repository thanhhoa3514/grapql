import mongoose from "mongoose";


const categoryArticleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        avatar: { type: String, trim: true },

        deleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

const CategoryArticle = mongoose.model("CategoryArticle", categoryArticleSchema, "category");

export default CategoryArticle;
