const express = require ("express");
const router = express.Router();
const Ingredient = require ("../models/IngredientModel");
const upload = require('../config/cloudinary');

router.get ("/ingredients", (req, res) => {
        Ingredient.find()
        .then((IngredientsList) => {
                res.status(200).json(IngredientsList);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
});

router.get ("/ingredients/:id", (req, res) => {
        Ingredient.findById(req.params.id)
        .then((IngredientsList) => {
                res.status(200).json(IngredientsList);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
});

router.post ("/ingredients", upload.single('photo'), (req, res) => {
        const {name, price} = req.body;
        const image = req.file.secure_url
        const newIngredient = {name, price, image};


        Ingredient.findOne({name}).then((ingredientFound) => {
                if (ingredientFound) {
                        return res.status(400).json({message: "Ingredient already in the list !"})
                }
        })

        Ingredient.create(newIngredient)
        .then((ingredientAdded) => {
                console.log("Ingredient succefully added !");
                res.status(200).json(ingredientAdded);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
})

router.patch ("/ingredients/:id", (req, res) => {
        Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((ingredientUpdated) => {
                res.status(200).json(ingredientUpdated);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
});

router.delete ("/ingredients/:id", (req, res) => {
        Ingredient.findByIdAndDelete(req.params.id)
        .then((ingredientDeleted) => {
                res.status(204).json(ingredientDeleted);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
})

module.exports = router;
