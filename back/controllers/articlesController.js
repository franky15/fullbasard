//importation de la base de données
const moment = require('moment'); //permet de formater la date

const DB = require("../mysql.config");
const bcrypt = require("bcrypt");

//POST creation d'un article
exports.createArticle = (req, res, next) => {
	console.log("*** bienvenue dans createArticle ***");

	console.log("***req.body");
	console.log(req.body);

	//récupération du role de l'utilisateur
	let role = req.auth.role;

	console.log("**role");
	console.log(role);

	let userId = req.auth.userId;

	let { picture, title, content, author, category, date } = req.body;

	//fonction formatage de la date
	/*
	const formatDateForMySQL = (date) => {
		const maDate = new Date(date);
		const annee = maDate.getFullYear();
		const mois = String(maDate.getMonth() + 1).padStart(2, "0");
		const jour = String(maDate.getDate()).padStart(2, "0");
		
		return `${annee}-${mois}-${jour}`;
		//return `${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`;
	};*/

	/*Attention à bien formater la date au format qu'on veut avant de l'envoyer à la base de données si non la base de donnée formatera la date au format par défaut
	ce format doit être celui auquel on veut que la donnée apparaisse aussi bien au bien dans la base que dans le front*/
	//const dateFormateePourMySQL = formatDateForMySQL(date);
	const dateFormateePourMySQL = moment(date).format('YYYY-MM-DD');
	
	console.log("dateFormateePourMySQL");
	console.log(dateFormateePourMySQL);

	//requete récupérant tous les articles
	const sqlSelectAllArticles = "SELECT * FROM Articles";

	if (role === "admin") {
		//vérification si l'article existe déjà dans la base de données
		DB.query(sqlSelectAllArticles, (err, resSqlSelectAllArticles) => {
			if (err) {
				console.log("erreur dans la requete");
				console.log(err.message);

				//envoie d'une réponse d'erreur au front
				res.status(400).json({ message: "erreur dans la requete" });
			} else {
				console.log("requete réussie");

				//recherche de l'utilisateur dans la liste reçu de la base de données
				let articleExist = resSqlSelectAllArticles.find(
					(article) => article.title === title,
				);

				if (articleExist) {
					//envoie d'une réponse d'erreur au front
					console.log("***Ce titre  existe déjà"); 
					res.status(500).json({
						message: "Ce titre existe déjà veillez modifier le titre de cet article",
					});
				} else {
					console.log("**** partie bcrypt");

					// La requête SQL utilise directement le hash
					const sqlInsertArticle = `INSERT INTO Articles (users_id, picture, title, content, author, category, date) VALUES ( ${userId}, "${picture}", "${title}", "${content}", "${author}", "${category}", "${dateFormateePourMySQL}" )`;

					DB.query(sqlInsertArticle, (err, resSqlInsertArticle) => {
						console.log("***resSqlInsertArticle");
						console.log(resSqlInsertArticle);

						if (err) {
							console.log("erreur dans la requete");
							console.log(err.message);

							//envoie d'une réponse d'erreur au front
							res.status(500).json({ message: "erreur dans la requete" });
						} else {
							console.log("requete réussie");
							console.log("***article créé avec succès");

							//envoie d'une réponse de succès au front
							res.status(200).json(resSqlInsertArticle);
						}
					});
				}
			}
		});
	} else {
		//envoie d'une réponse d'echec au front
		res.status(401).json({
			message:
				"Vous n'êtes pas autorisez à créer d'articles veillez demander les droits",
		});
	}
};

//DELETE suppression d'un article
exports.deleteArticle = (req, res, next) => {
	console.log("*** bienvenue dans deleteArticle ***");

	let id = parseInt(req.params.id);

	//récupération du role de l'utilisateur
	let role = req.auth.role;

	console.log("**role");
	console.log(role);

	//requete récupérant l'utilisateur
	const sqlSelectArticle = `SELECT * FROM Articles WHERE id = ${id}`;

	//requete de suppression de l'utilisateur dans la base de données
	const sqlDeleteArticle = `DELETE FROM Articles WHERE id = ${id}`;

	DB.query(sqlSelectArticle, (err, resSqlSelectArticle) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			//récupération de l'utilisateur
			const article = resSqlSelectArticle.find((article) => article.id === id);

			console.log("**article");
			console.log(article);

			//vérification de la permission de l'utilisateur
			if (role === "admin" && article.id === id) {
				console.log("** vous êtes un admin");
				DB.query(sqlDeleteArticle, (err, resSqlDeleteArticle) => {
					if (err) {
						console.log("erreur dans la requete");
						console.log(err.message);

						//envoie d'une réponse d'erreur au front
						res.status(500).json({ message: "erreur dans la requete" });
					} else {
						console.log("requete réussie");
						console.log(resSqlDeleteArticle);

						//envoie d'une réponse de succès au front
						res.status(200).json({ message: "Article supprimé avec succès" });
					}
				});
			} else {
				console.log("** vous n'êtes pas autorisé à supprimer cet article");
				res.status(401).json({
					message: "vous n'êtes pas autorisé à supprimer cet article",
				});
			}
		}
	});
};

//GET récupération de tous les utilisateurs
exports.getAllArticles = (req, res, next) => {
	console.log("*** bienvenue dans getAllArticles ***");

	//récupération du role de l'utilisateur
	/*let role = req.auth.role;

	console.log("**role")
	console.log(role)*/

	//requete récupérant tous les articles
	const sqlSelectAllArticles = "SELECT * FROM Articles";

	DB.query(sqlSelectAllArticles, (err, resSqlSqlSelectAllArticles) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			console.log("requete réussie");
			console.log(resSqlSqlSelectAllArticles);

			//envoie d'une réponse de succès au front
			res.status(200).json(resSqlSqlSelectAllArticles);
		}
	});
};

//GET récupération d'un article
exports.getArticle = (req, res, next) => {
	console.log("*** bienvenue dans getArticle ***");

	//récupération du paramètre id dans l'url
	let id = parseInt(req.params.id);

	console.log(id);

	//récupération du role de l'utilisateur
	//let role = req.auth.role;

	//console.log("**role")
	//console.log(role)

	//requete récupérant l'utilisateur
	const sqlSelectAllArticles = `SELECT * FROM Articles WHERE id = ${id}`;

	DB.query(sqlSelectAllArticles, (err, resSqlSelectAllArticles) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			//récupération de l'utilisateur
			const article = resSqlSelectAllArticles.find(
				(article) => article.id === id,
			);

			console.log("**article");
			console.log(article);

			console.log("requete réussie");
			console.log(article);

			//envoie d'une réponse de succès au front
			res.status(200).json(article);
		}
	});
};

//PUT modification d'un utilisateur
exports.updateArticle = (req, res, next) => {
	console.log("*** bienvenue dans updateArticle ***");

	let { picture, title, content, author, category, date } = req.body;

	/*
	//fonction formatage de la date
	const formatDateForMySQL = (date) => {
		const maDate = new Date(date);
		const annee = maDate.getFullYear();
		const mois = String(maDate.getMonth() + 1).padStart(2, "0");
		const jour = String(maDate.getDate()).padStart(2, "0");
		const heures = String(maDate.getHours()).padStart(2, "0");
		const minutes = String(maDate.getMinutes()).padStart(2, "0");
		const secondes = String(maDate.getSeconds()).padStart(2, "0");

		return `${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`;
	};

	const dateFormateePourMySQL = formatDateForMySQL(date);*/

	/*Attention à bien formater la date au format qu'on veut avant de l'envoyer à la base de données si non la base de donnée formatera la date au format par défaut
	ce format doit être celui auquel on veut que la donnée apparaisse aussi bien au bien dans la base que dans le front*/
	//const dateFormateePourMySQL = formatDateForMySQL(date);
	const dateFormateePourMySQL = moment(date).format('YYYY-MM-DD');

	//récupération du paramètre id dans l'url et conversion en entier
	let id = parseInt(req.params.id);

	console.log(id);

	//récupération du role de l'utilisateur
	let role = req.auth.role;

	console.log("**role");
	console.log(role);

	//requete récupérant l'article
	const sqlSelectAllArticles = `SELECT * FROM Articles WHERE id = ${id}`;

	DB.query(sqlSelectAllArticles, (err, resSqlSelectAllArticles) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			//requete de modification de l'article dans la base de données
			const sqlUpdateArticle = `UPDATE Articles SET picture = "${picture}", title = "${title}", content = "${content}", author = "${author}", category="${category}", date="${dateFormateePourMySQL}"  WHERE id = ${id} `;

			//récupération de l'article
			const article = resSqlSelectAllArticles.find(
				(article) => article.id === id,
			);

			console.log("**article");
			console.log(article);

			if (role === "admin" && article.id === id) {
				DB.query(sqlUpdateArticle, (err, resSqlUpdateArticle) => {
					if (err) {
						console.log("erreur dans la requete");
						console.log(err.message);

						//envoie d'une réponse d'erreur au front
						res.status(500).json({ message: "erreur dans la requete" });
					} else {
						console.log("*** Article mis à jour avec succès");
						console.log(resSqlUpdateArticle);

						//envoie d'une réponse de succès au front
						res.status(200).json(resSqlUpdateArticle);
					}
				});
			} else {
				//envoie d'une réponse de non autorisation au front
				res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à modifier cet article" });
			}
		}
	});
};
