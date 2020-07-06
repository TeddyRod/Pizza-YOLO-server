const express = require ("express");
const router = express.Router();
const Recipe = require ("../models/RecipeModel");
const upload = require('../config/cloudinary');
const chalk = require('chalk');

router.get ("/recipes", (req, res) => {
        Recipe.find()
        .populate("ingredients")
        .then((recipeList) => {
                console.log(' => ' + chalk.green(`recipe collection is loaded`))
                res.status(200).json(recipeList);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
});

router.get ("/recipes/:id", (req, res) => {
        Recipe.findById(req.params.id)
        .populate("ingredients")
        .then((oneRecipe) => {
                console.log(chalk.gray.bold.bgGreen(` ${oneRecipe.name} `) + chalk.green(` is loaded`))
                res.status(200).json(oneRecipe);
        })
        .catch((err) => {
                res.status(500).json(err);
        });
});

router.post("/recipes", upload.single("image"), (req, res) => {
        const { name, price, offer, star } = req.body;
        const newRecipe = { name, price, offer, star };
        // const newRecipe.ingredients = [];
      
        if (req.file) {
          newRecipe.image = req.file.secure_url;
        }

        if (req.body.ingredients) {
                newRecipe.ingredients = [];
                newRecipe.ingredients.push(req.body.ingredients);
        }
            
        Recipe.create(newRecipe)
          .then((oneRecipe) => {
                console.log(chalk.gray.bgGreen(` ${oneRecipe.name} `) + ` successfully` + chalk.green(` added+`) + ' with the _id : ' + chalk.bold.blue(`${oneRecipe._id}`));
                res.status(201).json(oneRecipe);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });

router.patch ("/recipes/:id", upload.single("image"), (req, res) => {
      
        Recipe.findByIdAndUpdate(req.params.id, req.body)

        .then((oneRecipe) => {
                console.log(chalk.gray.bold.bgGreen(` ${oneRecipe.name} `) + ` successfully` + chalk.yellow(` patched ^`))
                res.status(200).json(oneRecipe);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
});

router.delete ("/recipes/:id", (req, res) => {
        Recipe.findByIdAndDelete(req.params.id)
        .then((oneRecipe) => {
                console.log(chalk.gray.bold.bgGreen(` ${oneRecipe.name} `) + ` successfully` + chalk.red(` deleted -`))
                res.status(204).json(oneRecipe);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
})

module.exports = router;
