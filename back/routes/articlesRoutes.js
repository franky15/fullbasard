/****importation des modules nécessaires */
const express = require("express");
const router = express.Router();

//importation du controller
const articlesController = require('../controllers/articlesController');
//importation du middleware de connexion ou d'authenfication
const auth = require('../midleWares/auth');

//impportation des routes
router.post("/", auth, articlesController.createArticle);
router.delete("/:id", auth, articlesController.deleteArticle);
router.put("/:id", auth, articlesController.updateArticle);
router.get("/", articlesController.getAllArticles);
router.get("/:id", articlesController.getArticle);


//exportation des routes
module.exports = router;