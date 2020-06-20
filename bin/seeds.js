require ("dotenv").config();
const mongoose = require("mongoose");
const Ingredient = require ("../models/Ingredient");

const Ingredients = [
        {
                name: "Tomate",
                price: 2,
                image: "https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38="
        },
        {
                name: "Mozzarella",
                price: 4,
                image: "https://www.toutunfromage.com/241-large_default/mozzarella-di-bufala-campana.jpg"
        }
]

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to ${self.connection.name}`);
    Ingredient.create(Ingredients)
      .then((newIngredients) => console.log(newIngredients))
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.log(err);
  });