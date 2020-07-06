const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
        // _id : {type : String, default: null},
        name: {type: String, required: true},
        image: {type: String},
        price: {type: Number, required: true},
        offer : {type: Number, default: null},
        star: {type: Boolean, default: false},
        newrecipe: {type: Boolean, default: false},
        newpizza: {type: Boolean, default: true},
        ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
})

const Recipe = mongoose.model ("Recipe",recipeSchema);
module.exports = Recipe; 