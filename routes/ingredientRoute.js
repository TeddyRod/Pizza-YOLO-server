const express = require ("express");
const router = express.Router();
const Ingredient = require ("../models/IngredientModel");
const upload = require('../config/cloudinary');
const chalk = require('chalk');
const Recipe = require("../models/RecipeModel");

router.get ("/ingredients", (req, res) => {
        Ingredient.find()
        .then((IngredientsList) => {
                console.log(' => ' + chalk.green(`Ingredients collection is loaded`))
                res.status(200).json(IngredientsList);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
});

router.get ("/ingredients/:id", (req, res) => {
        Ingredient.findById(req.params.id)
        .then((oneIngredient) => {
                console.log(' => ' + chalk.gray.bgGreen(` ${oneIngredient.name} `) + chalk.green(` is loaded`))
                res.status(200).json(oneIngredient);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
});

router.post("/ingredients", upload.single("image"), (req, res) => {
        const { name, price } = req.body;
        const newIngredient = { name, price };
      
        if (req.file) {
          newIngredient.image = req.file.secure_url; // newIngredient = {name, price, image}
        }
      
        Ingredient.create(newIngredient)
          .then((oneIngredient) => {
            console.log(' => ' + chalk.gray.bgGreen(` ${oneIngredient.name} `) + ` successfully` + chalk.green(` added+`) + ' with the _id : ' + chalk.bold.blue(`${oneIngredient._id}`));
            res.status(201).json(oneIngredient);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });

router.patch ("/ingredients/:id", (req, res) => {
        Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((oneIngredient) => {
                console.log(' => ' + chalk.gray.bgGreen(`${oneIngredient.name}`) + ` successfully` + chalk.yellow(` patched ^`))
                res.status(200).json(oneIngredient);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
});

router.delete ("/ingredients/:id", (req, res) => {
        Ingredient.findByIdAndDelete(req.params.id)
        .then((oneIngredient) => {
                console.log(' => ' + chalk.gray.bgGreen(`${oneIngredient.name}`) + ` successfully` + chalk.red(` deleted -`))
                res.status(204).json(oneIngredient);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
})

module.exports = router;
