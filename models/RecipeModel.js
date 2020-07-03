const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        offer : {type: Number, default: null},
        star: {type: Boolean, default: false},
        new: {type: Boolean, default: false},
        ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
})

const Recipe = mongoose.model ("Recipe",recipeSchema);
module.exports = Recipe; 