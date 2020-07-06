const express = require ('express');
const router = express.Router();
const User = require ("../models/UserModel");
const upload = require('../config/cloudinary');
const chalk = require('chalk');

router.get("/user", (req,res, next) => {
        User.find()
        .populate("fav")
        .then((userDB) => {
                res.status(200).json(userDB);
        })
        .catch((err) =>{
                res.status(500).json(err);
        })
});

router.get("/user/:id", (req, res, next) => {
        User.findById(req.params.id)
        .populate("fav")
        .then((userDB) => {
                res.status(200).json(userDB);
        })
        .catch((err) => {
                res.status(500).json(err);
        })
});

router.patch("/user/:id", (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((userDB) => {
            res.status(200).json(userDB);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });


router.delete("/user/:id", (req, res) => {
        User.findByIdAndDelete(req.params.id)
          .then((userDB) => {
            if (userDB === null) {
              res.status(404).json({ message: "User not found" });
            } else {
              res.status(204).json(userDB);
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
      
      module.exports = router;