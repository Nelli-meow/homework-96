import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Cocktail from "../models/Cocktail";
import {imagesUpload} from "../multer";
import {CocktailMutation} from "../types";

const CocktailRouter = express.Router();

CocktailRouter.get("/", async (req, res) => {
    try {
        const cocktails = await Cocktail.find();

        res.status(200).send(cocktails);
    }
    catch (error) {
        res.status(500).send({message: error});
    }
});

CocktailRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const cocktail = await Cocktail.findById(id);

        if (!cocktail) {
            res.status(404).send({error: 'Cocktail not found!'});
            return;
        }

        res.status(200).send(cocktail);
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
});


CocktailRouter.post("/", imagesUpload.single('image'), auth, permit('user', 'admin'), async (req, res) => {
    try {
        const expressReq = req as RequestWithUser;
        const user = expressReq.user;

        if (!user) {
            res.status(401).send({error: 'User not found!'});
            return;
        }

        const parseIngredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];

        const {name} = req.body;

        if (!name) {
            res.status(400).send('Name is required');
            return;
        }

        const newCocktail: CocktailMutation = {
            user: user._id,
            name: name,
            image: req.file ? 'images' + req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: parseIngredients,
        }

        const cocktail = new Cocktail(newCocktail);
        await cocktail.save();

        res.status(200).send(cocktail);
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
});

CocktailRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const cocktail = await Cocktail.findById(id);
        if (!cocktail) {
            res.status(404).send({message: "cocktail not found"});
            return;
        }

        await Cocktail.findByIdAndDelete(id);
        res.status(200).send({message: "Cocktail deleted successfully"});
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
});

CocktailRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const cocktail = await Cocktail.findById(id);
        if (!cocktail) {
            res.status(404).send({error: "cocktail not found"});
            return;
        }

        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();

        res.status(200).send({message: "cocktail publication status updated", cocktail});
    } catch (error) {
        res.status(404).send({error: "something went wrong"});
    }
});

export default CocktailRouter;