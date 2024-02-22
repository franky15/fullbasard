//import des modules nécessaires
const express = require("express");
const cors = require("cors"); 

//pour éxécuter le __le dirname
const path = require('path');


//importation de la base de données
const db = require("./mysql.config")  

//importation des modules de routages
const usersRoutes = require("./routes/usersRoutes");

//creation de l'api
const app = express();

app.use(cors());   //evite les erreurs cors
app.use(express.json()); //l'api va communiquer en json et c'est là qu'on donne accès au body de la requête
app.use(express.urlencoded({ extended: true })); //l'encodage des url car on a plusieurs types d'url


//mise en place des routes
app.use("/users", usersRoutes);

module.exports = app; 

