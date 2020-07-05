//.env link & config
require ("dotenv").config();
require ("./config/dbConnection");

// Express.js setup
const express = require ("express");
const app = express();

// 3rd party node.js packages
const path = require ("path");
const logger = require ("morgan");
const session = require ("express-session");
const cookieParser = require ("cookie-parser");
const MongoStore = require ("connect-mongo")(session);
const mongoose = require ("mongoose");

// CORS middleware
const cors = require ("cors");
const corsOptions = {origin : process.env.FRONTEND_URL, credentials : true};
app.use(cors(corsOptions));

// 3rd party node.js packages setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extented : false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
        store: new MongoStore({ mongooseConnection : mongoose.connection }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
}));

// Test if logged before route
app.use(function(req, res, next) {
        console.log(req.session.currentUser);
        next();
})

// Routes
const indexRouter = require ("./routes/index");
const authRouter = require ("./routes/auth");
const ingredientRouter = require ("./routes/ingredientsRoute");
const recipeRouter = require ("./routes/recipesRoute")

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", ingredientRouter);
app.use(('/', recipeRouter));

// Export the app.js
module.exports = app;