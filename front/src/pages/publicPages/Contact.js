import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { accountServices } from "../../_services/Account.services";

const Contact = ({lockContact}) => {



	let navigate = useNavigate(); //pour utiliser useNavigate


	//state des champs
	

	const [ prenom, setprenom] = useState("")
	const [ nom, setnom] = useState("")
	const [ email, setemail] = useState("")
	const [ message, setmessage] = useState("")


	////////////////////////////////////////////

	//logique de toute la page
	useEffect(() => {
		// reccupration du formulaire de contact


		const closeButton = document.querySelector('.closeButtonContact');
        const formulaireContact = document.querySelector('.formulaireContactItem');
        const formulaireNone = document.querySelector('.formulaireNone');
        const boutonContact = document.querySelector('.boutonContact');
        const recupPrenom = document.querySelector('.prenom');
        const recupNom = document.querySelector('.nom');
        const recupEmail = document.querySelector('.email');
        const recupMessage = document.querySelector('.message');


        // reccupration de tous les paragraph des msg d'erreur
        const prenomAlert = document.querySelector('.prenomErreur');
        const nomAlert = document.querySelector('.nomErreur');
        const emailAlert = document.querySelector('.emailErreur');
        const messageAlert = document.querySelector('.messageErreur');



		//verification et validation des champs du formulaire
		const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const regexMessage = /^[A-Za-z0-9\s.,;:'"!?()-]*$/;

		/******display none sur le formulaire sur le click de la croix rouge: MERLIN*/

        function fermetureFormulaireContact() {

            closeButton.addEventListener("click", function() {
                
                console.log("Formulaire contact affiché ");
                formulaireNone.style.display= "none"

            });


        }
		fermetureFormulaireContact(); 

		 /******création d'un objet représentant une personn: MERLIN*/

		 const personne = {
            prenom: '',
            nom: '',
            email: '',
            message: ''
            
        };

		// fonction de gestion des valeurs du formulaire de connexion
		function gestionValFormConex() {


			/******reccuperation des valeurs sur input prenom: MERLIN*/
			const prenom = document.querySelector('.prenom');

			// Variable pour stocker la valeur du champ
			let inputValuePrenom = '';
	
			// Ajouter un écouteur d'événements pour capturer les changements dans le champ
			prenom.addEventListener('input', function(event) {
				
				// Mettre à jour la variable avec la nouvelle valeur du champ
				inputValuePrenom = event.target.value;
	
				//mise a jour de la valeur prénom de l'objet personne
				personne.prenom = inputValuePrenom;

				//$$$$$$$$$ mise à jour du state pour obtenir l'objet
				
				setprenom(inputValuePrenom)

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

				// mascage de l'alert du champs prenom
				prenomAlert.style.display= "none"
				recupPrenom.style.border = '2px solid black';
				
				
				
			});


			/******reccuperation des valeurs sur input nom: MERLIN*/
			const nom = document.querySelector('.nom');

			// Variable pour stocker la valeur du champ
			let inputValueNom = '';
	
			// Ajouter un écouteur d'événements pour capturer les changements dans le champ
			nom.addEventListener('input', function(event) {
				// Mettre à jour la variable avec la nouvelle valeur du champ
				inputValueNom = event.target.value;
				personne.nom = inputValueNom;

				//$$$$$$$$$ mise à jour du state pour obtenir l'objet
				
				setnom(inputValueNom)

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

				nomAlert.style.display= "none"
				recupNom.style.border = '2px solid black';

			

			});
	
	
			/******reccuperation des valeurs sur input email: MERLIN*/
			const email = document.querySelector('.email');
	
			// Variable pour stocker la valeur du champ
			let inputValueEmail = '';
	
			// Ajouter un écouteur d'événements pour capturer les changements dans le champ
			email.addEventListener('input', function(event) {
			// Mettre à jour la variable avec la nouvelle valeur du champ
			inputValueEmail = event.target.value;
	
	
			//inssertion de la valeur inputValueEmail dans la proprieté email de l'objet personne
			personne.email = inputValueEmail;


			//$$$$$$$$$ mise à jour du state pour obtenir l'objet
			
			setemail(inputValueEmail)

			//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

			emailAlert.style.display= "none"
			recupEmail.style.border = '2px solid black';
			
			

			});
	
	
			/******reccuperation des valeurs sur input message: MERLIN*/
			const message = document.querySelector('.message');
	
			// Variable pour stocker la valeur du champ
			let inputValueMessage = '';
	
			// Ajouter un écouteur d'événements pour capturer les changements dans le champ
			message.addEventListener('input', function(event) {
				// Mettre à jour la variable avec la nouvelle valeur du champ
				inputValueMessage = event.target.value;
	
				//inssertion de la valeur inputValueMessage dans la proprieté email de l'objet personne
				personne.message = inputValueMessage;

				//$$$$$$$$$ mise à jour du state pour obtenir l'objet
			
				setmessage(inputValueMessage)

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
				messageAlert.style.display= "none"
				recupMessage.style.border = '2px solid black';
				// Afficher la valeur dans la console
		
			
			
				
			});


			//envoie du formulaire
			function envoieFormulaire() {

				
				// reccupration de tous les paragraph des msg d'erreur
				
				


				//verification et validation des champs du formulaire
				const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

				const regexMessage = /^[A-Za-z0-9\s.,;:'"!?()-]*$/;

				const submitButton = document.querySelector('.submitButton');

				submitButton.addEventListener ('click',function(event){
					
					//permet de choisir quand on envoie le formulaire
					event.preventDefault()
					
					//console.log(personneState)



					const prenomValObjet = prenom
				
					
					if (!regexNomPrenom.test( prenomValObjet.trim()  )){

					
						prenomAlert.style.display= "block"
						recupPrenom.style.border = '2px solid red';
						

					} else {
					
						prenomAlert.style.display= "none"
					
					};


					//console.log(personneState);


					//control nom

					const nomValObjet = nom
					
					if (!regexNomPrenom.test( nomValObjet.trim()  )){

						
						nomAlert.style.display= "block"
						recupNom.style.border = '2px solid red';
						

					} else {
						
						nomAlert.style.display= "none"
					
					};


					//console.log(personneState);


					// control email

					const emailValObjet = email
					
					if (!emailRegex.test( emailValObjet.trim()  )){
						
						emailAlert.style.display= "block"
						recupEmail.style.border = '2px solid red';
						

					} else {
						
						emailAlert.style.display= "none"
					
					};


					//console.log(personneState);



					// control message

					const messageValObjet = message
					

					if (!regexMessage.test(messageValObjet) || messageValObjet === "" || messageValObjet === ""|| messageValObjet === " " ){
					
						
						messageAlert.style.display= "block"
						recupMessage.style.border = '2px solid red';
						

					} else {
					
						messageAlert.style.display= "none"
					
					};


					//console.log(personneState);

					
					//fermeture du formulaire 
					if( regexNomPrenom.test( prenomValObjet.trim()) &&
						regexNomPrenom.test( nomValObjet.trim()) && 
						emailRegex.test( emailValObjet.trim()) &&
						regexMessage.test(messageValObjet.trim())
					){

						//reqet d'envoie de l'objet au back-end


						
						//vidage des champs apres le mascage du formulaire
						/*formulaireContact.reset();

						//formatage de l'objet personne
						personneState.prenom= "";
						personneState.nom= "";
						personneState.email= "";
						personneState.message= "";
						

						formulaireNone.style.display= "none"*/

						

					}
					


				} )


			}
			//envoieFormulaire()

			
			
			

		}
		gestionValFormConex();

		
	}, []);

	//soumition du formulaire
	
	////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


	
	//vérification et validation du formulaire
	
	
	function submitForm() {
		//permet de choisir quand  est ce qu'on envoie le formulaire
		//event.preventDefault();

	
		const closeButton = document.querySelector('.closeButtonContact');
        const formulaireContact = document.querySelector('.formulaireContactItem');
        const formulaireNone = document.querySelector('.formulaireNone');
        const boutonContact = document.querySelector('.boutonContact');
        const recupPrenom = document.querySelector('.prenom');
        const recupNom = document.querySelector('.nom');
        const recupEmail = document.querySelector('.email');
        const recupMessage = document.querySelector('.message');


        // reccupration de tous les paragraph des msg d'erreur
        const prenomAlert = document.querySelector('.prenomErreur');
        const nomAlert = document.querySelector('.nomErreur');
        const emailAlert = document.querySelector('.emailErreur');
        const messageAlert = document.querySelector('.messageErreur');
		//verificationChamps();

		//regex
		//verification et validation des champs du formulaire
		const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const regexMessage = /^[A-Za-z0-9\s.,;:'"!?()-]*$/;

		const submitButton = document.querySelector('.submitButton');

		///////////////////////////

			//vérification du champ  password du formulaire
			if (!emailRegex.test(email.trim()) || email === "" ) {
				
				console.log("Test email échoué");
				emailAlert.style.display = "block";
				recupEmail.style.border = "2px solid red";

			} else {

				console.log("Test email réussi ");
				emailAlert.style.display = "none";
				recupEmail.style.border = "2px solid black";
			}
		//}

		//vérification du champ  password du formulaire

		//if (password !== " ") {

			console.log("****Test password");

			

			if (!regexNomPrenom.test(nom.trim()) || nom === "") {
				
				console.log("Test échoué");
				nomAlert.style.display = "block";
				recupNom.style.border = "2px solid red";
			
			} else {

				console.log("Test réussi");
				nomAlert.style.display = "none";
				recupNom.style.border = "2px solid black";
			}

			if (!regexNomPrenom.test(prenom.trim()) || prenom === "") {
				
				console.log("Test échoué");
				prenomAlert.style.display = "block";
				recupPrenom.style.border = "2px solid red";
			
			} else {

				console.log("Test réussi");
				prenomAlert.style.display = "none";
				recupPrenom.style.border = "2px solid black";
			}

			if (!regexMessage.test(message.trim()) || message === "") {
				
				console.log("Test échoué");
				messageAlert.style.display = "block";
				recupMessage.style.border = "2px solid red";
			
			} else {

				console.log("Test réussi");
				messageAlert.style.display = "none";
				recupMessage.style.border = "2px solid black";
			}



		//////////////////////////

		//vidage des champs apres le mascage du formulaire
		//formulaireContact.reset();

		const contactObject = {
			prenom: prenom,
            nom: nom,
            email: email,
            message: message
		};

		console.log("***contactObject final");
		console.log(contactObject);

		if (emailRegex.test(email.trim()) && email !== "" 
			&& regexNomPrenom.test(prenom.trim()) && prenom !== ""
			&& regexNomPrenom.test(nom.trim()) && nom !== ""
			&& regexMessage.test(message.trim()) && message !== ""
		){


			console.log("***** formulaire envoyé avec succès");

			/*
			//gestion de la requête d'envoie du formulaire
			accountServices
				.addMessage(contactObject)
				.then( res => {
					
					//confirmationEleveCreate() 
					console.log("***** message envoyé")

				})
				.catch( err => {

					//setclassExist(`Vous ne pouvez pas créer l'élève ${nom} car il existe déjà` )
				
					console.log(` **** erreur d'envoie de message : ` + err)
				
				
				})

			

			console.log("***** formulaire envoyé avec succès");

		*/

			//vidage des champs apres le mascage du formulaire
			formulaireContact.reset();

			//formatage de l'objet personne
			setemail("")
			setnom("")
			setmessage("")
			setprenom("")
			

			//formulaireNone.style.display= "none"

			//$$$$$$$$$$$$$$$$$$$
				lockContact()

			//$$$$$$$$$$$$$$$$$$$



		}
	}

	///////////////////////////////////////////




	return (
		<div className="Contact formulaireNone">
		<div className="contenerContact">
			<div className="formulaireContenerContact">
				<form className="formulaireContactItem">
					<div className="containercloseButton">
						<button className="closeButtonContact" onClick={()=>lockContact()}>X</button>
					</div>
					
					<h2>Ecrivez-Nous</h2>
		
					<label htmlFor="prenom">Prénom</label>
					<p className="prenomErreur">Veuillez correctement remplir le champ du prénom</p>
					<input type="text" className="prenom" name="prenom" placeholder="Prénom"  />
		
					<label htmlFor="nom">Nom</label>
					<p className="nomErreur">Veuillez correctement remplir le champ du nom</p>
					<input type="text" className="nom" name="nom" placeholder="Nom"  />
		
					<label htmlFor="email">Email</label>
					<p className="emailErreur">Veuillez correctement remplir le champ email</p>
					<input type="email" className="email" name="email" placeholder="Email"  />
		
					<label htmlFor="message">Message</label>
					<p className="messageErreur">Veuillez correctement remplir le champ du message</p>
					<textarea className="message" name="message" placeholder="Message"  ></textarea>
		
					{/*<input type="submit" className="submitButton"  />*/}
					
				</form>
				
				<button className="submitButtonContact" onClick={() => submitForm()}>
					Connexion
				</button>
		  </div>
		  
		</div>
	  </div>
	);
};

export default Contact;
