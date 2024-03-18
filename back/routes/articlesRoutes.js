/****importation des modules nécessaires */
const express = require("express");
const router = express.Router();

//importation du middleware de connexion ou d'authenfication
const auth = require('../midleWares/auth');

//importation de multer pour la gestion des images
//NB: multer va modifier le corps de la requête cce n'est plus du json) à cause de l'ajout du fichier on devra donc parser le corps de la requête pour obtenir à nouveau un objet json
const multer = require('../midleWares/multer-config');

//importation du controller
const articlesController = require('../controllers/articlesController');



//impportation des routes
router.post("/", auth,multer, articlesController.createArticle);
router.delete("/:id", auth, articlesController.deleteArticle);
router.put("/:id", auth,multer, articlesController.updateArticle);
router.get("/", articlesController.getAllArticles);
router.get("/:id", articlesController.getArticle);


//exportation des routes
module.exports = router;






