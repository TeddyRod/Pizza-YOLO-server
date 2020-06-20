const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema ({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String},
})

const Ingredient = mongoose.model ("Ingredient", ingredientSchema);

module.exports = Ingredient;