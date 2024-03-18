//import des modules nécessaires
const express = require("express");
const cors = require("cors"); 

//importation du module path pour la gestion des chemins de fichiers à cause de multer qui va enregistrer les fichiers (images)
const path = require('path');

const fs = require('fs');

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();


//importation de la base de données
const db = require("./mysql.config")  

//importation des modules de routages
const usersRoutes = require("./routes/usersRoutes");
const articlesRoutes = require("./routes/articlesRoutes");

//creation de l'api
const app = express();


var __dirname = path.resolve();  //récupération du chemin absolu du répertoire du fichier actuel si non on aura une erreur sur __dirname
app.use(cors());   //evite les erreurs cors

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/users", usersRoutes);
app.use("/articles", articlesRoutes); 
app.use('/images', express.static(path.join(__dirname, 'images')));  


module.exports = app; 

