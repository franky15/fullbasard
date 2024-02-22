const mysql = require('mysql');

//importation des variables d'environnement
require('dotenv').config();

// Creation de la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  
});


db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.message);
  } else {
    db.query(`SHOW TABLES`, (err, res) => {
        if (err) {

            console.log(err.message);
            console.log('erreur dans la requete'); 
        } else { 
            
            console.log(`Connexion à la base de données ${process.env.DB_DATABASE} réussie`);
        }
        
    })
   
  }
});

// Exportation de la connexion à la base de données
module.exports = db;
