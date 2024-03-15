
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { func } from "prop-types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//obligé d'importer comme ça si non erreur
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import { accountServices } from "../../_services/Account.services";
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$





const Login = ({ lockConexion }) => {

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	let navigate = useNavigate(); //pour utiliser useNavigate


	//state des champs
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

	//logique de toute la page
	useEffect(() => {

		// reccupration du formulaire de connexion
		const emailLogin = document.querySelector(".emailLogin");
		const emailLoginErreur = document.querySelector(".emailLoginErreur");
		const motDePasseLogin = document.querySelector(".motDePasseLogin");
		const passeLoginErreur = document.querySelector(".passeLoginErreur");

		//réccupération du bouton d'envoie du formulaire
		const submitButtonLogin = document.querySelector(".submitButtonLogin");

		/******création d'un objet qui contiendra les informations de connexion*/

		const loginObject = {

			email: "",
			password: "",

		};

		// fonction de gestion des valeurs du formulaire de connexion
		function gestionValFormConex() {

			//gestion du champ email
			// Ajout d'un écouteur d'événements pour capturer les changements dans les champs
			emailLogin.addEventListener("input", function (event) {


				// récupération de la valeur du champ
				let inputValueEmailConex = event.target.value;

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
				//////// mise  à jour de la variable avec la nouvelle valeur du champ
				setEmail(inputValueEmailConex);
				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

				//inssertion de la valeur inputValueEmailConex dans la proprieté emailConex de l'objet loginObject
				loginObject.email = inputValueEmailConex;

				//modification du style du champ email
				emailLoginErreur.style.display = "none";   //masquage de l'alerte d'erreur
				emailLogin.style.border = "2px solid black";


			}
			
			);

			//gestion du champ mot de passe
			// Ajouter un écouteur d'événements pour capturer les changements dans le champ de mot de passe
			motDePasseLogin.addEventListener("input", function (event) {

				//récupération de la valeur du champ
				let inputValueMotDePasseConex = event.target.value;

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
				// Mettre à jour la variable avec la nouvelle valeur du champ
				setPassword(inputValueMotDePasseConex);
				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

				// Mise à jour de la valeur du mot de passe de l'objet loginObject
				loginObject.password = inputValueMotDePasseConex;

				//mise à jour du style
				passeLoginErreur.style.display = "none";
				motDePasseLogin.style.border = "2px solid black";
				
				
			}
			
			);

		}
		gestionValFormConex();  //exécution de la fonction de gestion des valeurs du formulaire de connexion 

		//envoie du formulaire
		function envoieFormulaire() {

			//regexp pour la validation des champs
			const emailRegexConex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const passeRegexConex =   /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/; 

			//récupération du bouton d'envoie du formulaire et insertion d'un écouteur d'événements
			submitButtonLogin.addEventListener("click", function (event) {

				//permet de choisir quand  est ce qu'on envoie le formulaire
				event.preventDefault();

				
				//const emailValObjet = loginObject.prenom;

				//récupération de la valeur  de l'email de l'objet loginObject
				const emailValObjetConex = loginObject.email;

				//validation des champs du formulaire
				if ( !emailRegexConex.test( emailValObjetConex.trim() ) ) {

					console.log("Test échoué");

					emailLoginErreur.style.display = "block";  //affichage de l'alerte d'erreur du champ email
					emailLogin.style.border = "2px solid red";  //modification du style du champ email (coloration en rouge des bordures du champ)

				} else {

					console.log("Test réussi");

					emailLoginErreur.style.display = "none";  //masquage de l'alerte d'erreur du champ email

				}

				//vérification du champ  password du formulaire
				const passwordValObjet = loginObject.password;

				if ( !passeRegexConex.test(passwordValObjet.trim()) ) {

					console.log("Test échoué");
					passeLoginErreur.style.display = "block";
					motDePasseLogin.style.border = "2px solid red";

				} else {

					console.log("Test réussi");
					passeLoginErreur.style.display = "none";

				}


			});
		}
		


	}, []);

	//soumition du formulaire

	//regex
	const emailRegexConex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passeRegexConex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

	//vérification et validation du formulaire
	

	function submitForm() {
		//permet de choisir quand  est ce qu'on envoie le formulaire
		//event.preventDefault();

		const emailLogin = document.querySelector(".emailLogin");
		const emailLoginErreur = document.querySelector(".emailLoginErreur");
		const motDePasseLogin = document.querySelector(".motDePasseLogin");
		const passeLoginErreur = document.querySelector(".passeLoginErreur");
		const submitButtonLogin = document.querySelector(".submitButtonLogin");
		const authentificationErreur = document.querySelector(".authentificationEchoue");
		const formulaireNoneConnexion = document.querySelector(".formulaireNoneConnexion");

		const formulaireContact = document.querySelector(".Loginformulaire");
		//verificationChamps();

		//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

		///////////////////////////

			//vérification du champ  password du formulaire
			if (!emailRegexConex.test(email.trim()) || email === "" ) {
				
				console.log("Test email échoué");
				emailLoginErreur.style.display = "block";
				emailLogin.style.border = "2px solid red";

			} else {

				console.log("Test email réussi ");
				emailLoginErreur.style.display = "none";
				emailLogin.style.border = "2px solid black";
			}
		//}

		//vérification du champ  password du formulaire

			if (!passeRegexConex.test(password.trim()) || password === "") {
				
				console.log("Test échoué");
				passeLoginErreur.style.display = "block";
				motDePasseLogin.style.border = "2px solid red";
			
			} else {

				console.log("Test réussi");
				passeLoginErreur.style.display = "none";
				motDePasseLogin.style.border = "2px solid black";
			}



		//////////////////////////

		//vidage des champs apres le mascage du formulaire
		//formulaireContact.reset();

		const loginObject = {
			email: email,
			password: password,
		};

		console.log("***loginObject final");
		console.log(loginObject);

		//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


		//vérification que les champs sont correctement remplis et que tous les tests sont passés
		if (emailRegexConex.test(email.trim()) && email !== "" 
			&& passeRegexConex.test(password.trim()) && password !== ""){



		
			//gestion de la requête d'envoie du formulaire

			//équivalent de la requête en fetch

			/*
				fetch("http://localhost:5000/api/auth/login", {
					
					method: 'POST',  							//type de la requête
					headers: {

						'Content-Type': 'application/json'  	//type de contenu de la requête
					},
					body: JSON.stringify(loginObject)  			//conversion de l'objet en format json

				}).then( (res) => res.json() )  
				.then( (res) => console.log(res))			

			*/

			//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
			accountServices 
				.login(loginObject)
				.then((res) => {

					accountServices.saveToken(res.data.token); //récupération du token  dans la reponse et son enregistrement dans le localstorage
					
					//décodaje du token et redirection de l'utilisateur vers son espace
					const token = accountServices.getToken("token")
					
					if (token) {
						try {
							// Décoder le token
							const decodedToken = jwtDecode(token);
			
							// Récupérer le rôle de l'utilisateur depuis le token
							const role = decodedToken.role;

							// Récupération du temps d'expiration du token il est en secondes
							const expireToken = decodedToken.exp;
			
							//Récupération du temps actuel en secondes
							const timeInSecond = Math.floor(Date.now() / 1000) ;

							// Rediriger l'utilisateur en fonction de son rôle
							if (role === 'admin'  && expireToken  >  timeInSecond ) {

					
								//vidage des champs
								formulaireContact.reset();
								setEmail("")
								setPassword("")

								// Redirection vers l'espace admin
								navigate("/admin/blog/articles")
								


							} else if (role === 'visitor' && expireToken  >  timeInSecond  ) {
								
								authentificationErreur.style.display = "none"; 

								//vidage des champs
								formulaireContact.reset();
								setEmail("")
								setPassword("")

								// Redirection vers l'espace visiteur
								navigate("/visitor/blog") //visitor


							} else {

								// s'il n y a pas de role dans le token  ou que le token est expiré
								console.log("****** aucun role dans le token ou token expiré")
								//on supprime le token du localstorage
								accountServices.logout()
								navigate("/")

								
							}
							} catch (error) {
								console.error('Erreur lors du décodage du token :', error);
								
								//si le token n'existe pas dans la requete on le supprime dans le localstorage
								accountServices.logout()
								navigate("/")
							}
					}
					//navigate("/admin");
				})
				.catch( err => {

					//puis on affiche l'alerte de non authentification
					authentificationErreur.style.display = "block"; 
					//formulaireNoneConnexion.style.display = "block";
					
					console.log("****Mot de passe incorrect ou email incorrect")
				
				
				})

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

		}

		console.log("***** formulaire envoyé avec succès");
	}

	///////////////////////////////////////////

	return (
		<div className="Login formulaireNoneConnexion">
			<div className="containerLogin">
				<form className="Loginformulaire">
					<div className="closeButtonContainer">
						<button className="closeButtonConex" onClick={() => lockConexion()}>
							X
						</button>
					</div>

					<h2 className="titreLogin">Veillez vous connectez</h2>

					<p className="emailLoginErreur">
						Veuillez correctement remplir le champ de l'email
					</p>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						className="emailLogin"
						name="email"
						placeholder="Entrer votre e-mail"
					/>

					<p className="passeLoginErreur">
						Veuillez correctement remplir le champ du mot de passe
					</p>
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						className="motDePasseLogin"
						name="password"
						placeholder="*******"
					/>

					
				</form>
				<button className="submitButtonLogin" onClick={() => submitForm()}>  {/*$$$$$$$$$$$$ Envoie du formulaire$$$$$$$$$$$*/}
					Connexion
				</button>
				<p className="authentificationEchoue">
					Mot de passe incorrect ou email incorrect
				</p>
			</div>
		</div>
	);
};

export default Login;
