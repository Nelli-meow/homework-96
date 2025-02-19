import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    ingredients: [
        {
            ingredientName: { type: String, required: true },
            ingredientAmount: { type: String, required: true },
        }
    ],
    rating: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            ratingFromUser: Number,
        }
    ]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;