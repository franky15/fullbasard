//importation de la base de données
const DB = require("../mysql.config");

//POST creation d'un utilisateur
exports.createUser = (req, res, next) => {
	console.log("*** bienvenue dans createUser ***");

    console.log(req.body);

	let { prenom, nom, email, password } = req.body;

	//requete récupérant tous les utilisateurs
	const sqlSelectAllUsers = "SELECT * FROM Users";

	//vérification si l'utilisateur existe déjà dans la base de données
	DB.query(sqlSelectAllUsers, (err, resSqlSelectAllUsers) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			console.log("requete réussie");
			console.log(resSqlSelectAllUsers);

			//recherche de l'utilisateur dans la liste reçu de la base de données
			let userExist = resSqlSelectAllUsers.find((user) => user.email === email);

			if (userExist) {
				//envoie d'une réponse d'erreur au front
				res.status(500).json({ message: "cet utilisateur existe déjà" });
			} else {
				//requete d'insertion de l'utilisateur dans la base de données
				const sqlInsertUser = `INSERT INTO Users (nom, prenom, email, password) VALUES ('${nom}', '${prenom}', '${email}', '${password}')`;

				DB.query(sqlInsertUser, (err, resSqlInsertUser) => {
					if (err) {
						console.log("erreur dans la requete");
						console.log(err.message);

						//envoie d'une réponse d'erreur au front
						res.status(500).json({ message: "erreur dans la requete" });
					} else {
						console.log("requete réussie");
						//console.log(resSqlInsertUser);

						//envoie d'une réponse de succès au front
						res.status(200).json({ message: "utilisateur créé avec succès" });
					}
				});
			}
		}
	});
};

//DELETE suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
	console.log("*** bienvenue dans deleteUser ***");

    let id = parseInt(req.params.id);

	//requete de suppression de l'utilisateur dans la base de données
	const sqlDeleteUser = `DELETE FROM Users WHERE id = ${id}`;

	DB.query(sqlDeleteUser, (err, resSqlDeleteUser) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			console.log("requete réussie");
			console.log(resSqlDeleteUser);

			//envoie d'une réponse de succès au front
			res.status(200).json({ message: "utilisateur supprimé avec succès" });
		}
	});
};

//GET récupération de tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
	console.log("*** bienvenue dans getAllUsers ***");

	//requete récupérant tous les utilisateurs
	const sqlSelectAllUsers = "SELECT * FROM Users";

	DB.query(sqlSelectAllUsers, (err, resSqlSelectAllUsers) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			console.log("requete réussie");
			console.log(resSqlSelectAllUsers);

			//envoie d'une réponse de succès au front
			res.status(200).json(resSqlSelectAllUsers);
		}
	});
};

//GET récupération d'un utilisateur
exports.getUser = (req, res, next) => {
	console.log("*** bienvenue dans getUser ***");

    //récupération du paramètre id dans l'url
    let id = req.params.id;

    console.log(id);

	//requete récupérant l'utilisateur
	const sqlSelectUser = `SELECT * FROM Users WHERE id = '${id}'`;

	DB.query(sqlSelectUser, (err, resSqlSelectUser) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			console.log("requete réussie");
			console.log(resSqlSelectUser);

			//envoie d'une réponse de succès au front
			res.status(200).json(resSqlSelectUser);
		}
	});
};

//PUT modification d'un utilisateur
exports.updateUser = (req, res, next) => {
	console.log("*** bienvenue dans updateUser ***");

	let { nom, prenom, email, password } = req.body;

    //récupération du paramètre id dans l'url et conversion en entier
    let id = parseInt(req.params.id);

    console.log(id);

	//requete de modification de l'utilisateur dans la base de données
	const sqlUpdateUser = `UPDATE Users SET nom = '${nom}', prenom = '${prenom}', email = '${email}', password = '${password}' WHERE id = ${id} `

	DB.query(sqlUpdateUser, (err, resSqlUpdateUser) => {

		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });
		} else {
			console.log("requete réussie");
			console.log(resSqlUpdateUser);

			//envoie d'une réponse de succès au front
			res.status(200).json({ message: "utilisateur modifié avec succès" });
		}
	});
};
