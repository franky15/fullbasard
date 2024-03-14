//importation de la base de données
const DB = require("../mysql.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();

//POST login connexion d'un utilisateur
exports.login = (req, res, next) => {
	console.log("*** bienvenue dans login ***");

	//console.log(req.body);

	let { email, password } = req.body;

	console.log(email, password);

	//requete récupérant l'utilisateur
	const sqlSelectUser = `SELECT * FROM Users WHERE email = '${email}' `;

	DB.query(sqlSelectUser, (err, resSqlSelectUser) => {
		if (err) {
			console.log("***erreur dans la requete resSqlSelectUser");

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "**erreur dans la requete" });
		
		} else {
			console.log("requete réussie");
			console.log(resSqlSelectUser);

			if(resSqlSelectUser.length !== 0 ){
				
			
			//comparaison des deux hash de mot de passe
			bcrypt
				.compare(password, resSqlSelectUser[0].password)
				.then((valid) => {

					console.log("***valid")
					console.log(valid)

					if (!valid) {
						//envoie d'une réponse d'erreur au front
						res.status(401).json({ message: "mot de passe incorrect ou email incorrect" });
						console.error("mot de passe incorrect ou email incorrect :", err);
							
					} else {

						res.status(200).json({  

							//création du token
							token: jwt.sign(
								{
									userId: resSqlSelectUser[0].id,
									role: resSqlSelectUser[0].role,
								},
								process.env.TOKEN_KEY, //clé secrete
								{ expiresIn: process.env.TOKEN_EXPIRE }, //date d'expiration
							
							),

						});
					}  

				})
				.catch((err) => {
					//envoie d'une réponse d'erreur au front
					console.error("Erreur de connexion :", err);
					res.status(500).json({ err });
				
				});

			}else{

				console.error("Erreur de connexion :");
				res.status(401).json({ message: "Erreur de connexion" });
			}
		}
	});
};

//POST creation d'un utilisateur
exports.signum = (req, res, next) => {
	console.log("*** bienvenue dans signum ***");

	console.log("***req.body");
	console.log(req.body);

	let { role, prenom, nom, email, password } = req.body;

	console.log("***role");
	console.log(role);

	if (!role) {
		console.log("***role n'existe pas");
		role = "visitor";
	}

	//requete récupérant tous les utilisateurs
	const sqlSelectAllUsers = "SELECT * FROM Users";

	//vérification si l'utilisateur existe déjà dans la base de données
	DB.query(sqlSelectAllUsers, (err, resSqlSelectAllUsers) => {
		if (err) {
			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(400).json({ message: "erreur dans la requete" });
		} else {

			console.log("requete réussie");

			//if(resSqlSelectAllUsers.length !== 0 ){
				
				//recherche de l'utilisateur dans la liste reçu de la base de données
				let userExist = resSqlSelectAllUsers.find((user) => user.email === email);

				if (userExist) {
					//envoie d'une réponse d'erreur au front
					console.log("***cet utilisateur existe déjà");
					res.status(500).json({ message: "cet utilisateur existe déjà" });
				} else {
					console.log("**** partie bcrypt");

					//hashage du mot de passe
					bcrypt
						.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
						.then((hash) => {
							console.log("***testttttttt");
							// La requête SQL utilise directement le hash
							const sqlInsertUser = `INSERT INTO Users (role, nom, prenom, email, password) VALUES ('${role}', '${nom}', '${prenom}', '${email}', '${hash}')`;

							DB.query(sqlInsertUser, (err, resSqlInsertUser) => {
								console.log("***sqlInsertUser");
								console.log(sqlInsertUser);

								if (err) {
									console.log("erreur dans la requete");
									console.log(err.message);

									//envoie d'une réponse d'erreur au front
									res.status(500).json({ message: "erreur dans la requete" });
								} else {
									console.log("requete réussie");
									console.log("***utilisteur créé avec succès");

									//envoie d'une réponse de succès au front
									res.status(200).json(resSqlInsertUser);
								}
							});
						})
						.catch((err) => {
							res.status(500).json({ err });
						});
				}

			//}
		}
	});
};

//DELETE suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
	console.log("*** bienvenue dans deleteUser ***");

	let id = parseInt(req.params.id);

	//récupération du role de l'utilisateur
	let role = req.auth.role;

	console.log("**role")
	console.log(role)
	
	//requete récupérant l'utilisateur
	const sqlSelectUser = `SELECT * FROM Users WHERE id = '${id}'`;

	//requete de suppression de l'utilisateur dans la base de données
	const sqlDeleteUser = `DELETE FROM Users WHERE id = ${id}`;

	DB.query(sqlSelectUser, (err, resSqlSelectUser) =>{


		if(err){

			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });

		}else{

			//récupération de l'utilisateur
			const user = resSqlSelectUser.find( user => user.id === id)
		
			console.log("**user")
			console.log(user)

			//vérification de la permission de l'utilisateur
			if(role === "admin" || user.id === id ){

				console.log("** vous êtes un admin")
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

			}else{ 

				console.log("** vous n'êtes pas autorisé à supprimer un utilisateur")
				res.status(401).json({ message: "vous n'êtes pas autorisé à supprimer un utilisateur" });
			}

		}
	})
	
};

//GET récupération de tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
	console.log("*** bienvenue dans getAllUsers ***");

	//récupération du role de l'utilisateur
	let role = req.auth.role;

	console.log("**role")
	console.log(role)
	
	console.log(req.auth);

	//requete récupérant tous les utilisateurs
	const sqlSelectAllUsers = "SELECT * FROM Users";

	if(role === "admin"){

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

	}else{

		//envoie d'une réponse de non autorisation au front
		res.status(401).json({message: "Vous n'êtes pas autorisé à voir tous les utilisateurs"});
	}
	
};

//GET récupération d'un utilisateur
exports.getUser = (req, res, next) => {
	console.log("*** bienvenue dans getUser ***");

	//récupération du paramètre id dans l'url
	let id = parseInt(req.params.id);

	console.log(id);

	//récupération du role de l'utilisateur
	let role = req.auth.role;


	console.log("**role")
	console.log(role)

	
	
	//requete récupérant l'utilisateur
	const sqlSelectUser = `SELECT * FROM Users WHERE id = ${id}`;


	DB.query(sqlSelectUser, (err, resSqlSelectUser) =>{


		if(err){

			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });

		}else{

			//récupération de l'utilisateur
			const user = resSqlSelectUser.find( user => user.id === id)
		
			console.log("**user")
			console.log(user)

			if( role === "admin" || user.id === id ){

				console.log("requete réussie");
				console.log(resSqlSelectUser);
	
				//envoie d'une réponse de succès au front
				res.status(200).json(resSqlSelectUser);
					

			}else{

				//envoie d'une réponse de non autorisation au front
				res.status(401).json({message: "Vous n'êtes pas autorisé à voir tous les utilisateurs"});
			}


		}

	})

	
};

//PUT modification d'un utilisateur
exports.updateUser = (req, res, next) => {
	console.log("*** bienvenue dans updateUser ***");

	let { nom, prenom, email, password } = req.body;

	//récupération du paramètre id dans l'url et conversion en entier
	let id = parseInt(req.params.id);

	console.log(id);


	//récupération du role de l'utilisateur
	let role = req.auth.role;

	console.log("**role")
	console.log(role)
	
	//requete récupérant l'utilisateur
	const sqlSelectUser = `SELECT * FROM Users WHERE id = '${id}'`;

	DB.query(sqlSelectUser, (err, resSqlSelectUser) =>{


		if(err){

			console.log("erreur dans la requete");
			console.log(err.message);

			//envoie d'une réponse d'erreur au front
			res.status(500).json({ message: "erreur dans la requete" });

		}else{

			//hashage à nouveau du mot de passe 
			bcrypt
				.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
				.then((hash) => {
					console.log("***testttttttt");
					// La requête SQL utilise directement le hash

					//requete de modification de l'utilisateur dans la base de données
					const sqlUpdateUser = `UPDATE Users SET nom = '${nom}', prenom = '${prenom}', email = '${email}', password = '${hash}' WHERE id = ${id} `;

					//récupération de l'utilisateur
					const user = resSqlSelectUser.find( user => user.id === id)
				
					console.log("**user")
					console.log(user)

					if( role === "admin" || user.id === id){

						DB.query(sqlUpdateUser, (err, resSqlUpdateUser) => {
							if (err) {
								console.log("erreur dans la requete");
								console.log(err.message);
					
								//envoie d'une réponse d'erreur au front
								res.status(500).json({ message: "erreur dans la requete" });
							} else {
								console.log("***rutilisateur mis à jour avec succès");
								console.log(resSqlUpdateUser);
					
								//envoie d'une réponse de succès au front
								res.status(200).json(resSqlUpdateUser);
							}
						});

					}else{

						//envoie d'une réponse de non autorisation au front
						res.status(401).json({message: "Vous n'êtes pas autorisé à modifier cette utilisateur"});
					}
				})
				.catch((err) => {
					res.status(500).json({ err });
				});
 

		}

	});
	
};
