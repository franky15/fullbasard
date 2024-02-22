/****importation des modules nécessaires */
const express = require("express");
const router = express.Router();

//importation du controller
const usersController = require('../controllers/usersController');

//impportation des routes
router.post("/", usersController.createUser);
router.delete("/:id", usersController.deleteUser);
router.put("/:id", usersController.updateUser);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUser);


//exportation des routes
module.exports = router;