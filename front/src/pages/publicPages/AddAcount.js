import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { userServices } from "../../_services/User.services";


const AddAcount = ({lockSignum}) => {



  let navigate = useNavigate(); //pour utiliser useNavigate


	//state des champs
	

	const [ prenom, setprenom] = useState("")
	const [ nom, setnom] = useState("")
	const [ email, setemail] = useState("")
	const [ passwordUser, setpasswordUser] = useState("")


	////////////////////////////////////////////

	//logique de toute la page
	useEffect(() => {
		// reccupration du formulaire de contact


		const closeButton = document.querySelector('.closeButtonCreer');
    const formulaireContact = document.querySelector('.formulaireCompteCreer');
    const formulaireNone = document.querySelector('.formulaireNoneCreer');
    const boutonContact = document.querySelector('.boutonContactCreer');
    const recupPrenom = document.querySelector('.prenomCreer');
    const recupNom = document.querySelector('.nomCreer');
    const recupEmail = document.querySelector('.emailCreer');
    const recuppasswordUser = document.querySelector('.passwordUserCreer');


    // reccupration de tous les paragraph des msg d'erreur
    const prenomAlert = document.querySelector('.prenomErreurCreer');
    const nomAlert = document.querySelector('.nomErreurCreer');
    const emailAlert = document.querySelector('.emailErreurCreer');
    const passwordUserAlert = document.querySelector('.passwordUserErreurCreer');



		//verification et validation des champs du formulaire
		const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const regexpasswordUser = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

		/******display none sur le formulaire sur le click de la croix rouge: MERLIN*/

        function fermetureFormulaireContact() {

            closeButton.addEventListener("click", function() {
                
                console.log("Formulaire contact affiché ");
                formulaireNone.style.display= "none"

            });


        }
		//fermetureFormulaireContact(); 

		 /******création d'un objet représentant une personn: MERLIN*/

		 const personne = {
            prenom: '',
            nom: '',
            email: '',
            password: ''
            
        };

		// fonction de gestion des valeurs du formulaire de connexion
		function gestionValFormConex() {


			/******reccuperation des valeurs sur input prenom: MERLIN*/
			const prenom = document.querySelector('.prenomCreer');

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
			const nom = document.querySelector('.nomCreer');

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
			const email = document.querySelector('.emailCreer');
	
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
			const passwordUser = document.querySelector('.passwordUserCreer');
	
			// Variable pour stocker la valeur du champ
			let inputValuepasswordUser = '';
	
			// Ajouter un écouteur d'événements pour capturer les changements dans le champ
			passwordUser.addEventListener('input', function(event) {
				// Mettre à jour la variable avec la nouvelle valeur du champ
				inputValuepasswordUser = event.target.value;
	
				//inssertion de la valeur inputValuepasswordUserdans la proprieté email de l'objet personne
				personne.password = inputValuepasswordUser;

				//$$$$$$$$$ mise à jour du state pour obtenir l'objet
			
				setpasswordUser(inputValuepasswordUser)

				//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
				passwordUserAlert.style.display= "none"
				recuppasswordUser.style.border = '2px solid black';
				// Afficher la valeur dans la console
		
			
			
				
			});


			//envoie du formulaire
			function envoieFormulaire() {

				
				// reccupration de tous les paragraph des msg d'erreur
				
				


				//verification et validation des champs du formulaire
				const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

				const regexpasswordUser = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

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

					const passwordUserValObjet = passwordUser
					

					if (!regexpasswordUser.test(passwordUserValObjet) || passwordUserValObjet === "" || passwordUserValObjet === ""|| passwordUserValObjet === " " ){
					
						
						passwordUserAlert.style.display= "block"
						recuppasswordUser.style.border = '2px solid red';
						

					} else {
					
						passwordUserAlert.style.display= "none"
					
					};


					//console.log(personneState);

					
					//fermeture du formulaire 
					if( regexNomPrenom.test( prenomValObjet.trim()) &&
						regexNomPrenom.test( nomValObjet.trim()) && 
						emailRegex.test( emailValObjet.trim()) &&
						regexpasswordUser.test(passwordUserValObjet.trim())
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

	
		const closeButton = document.querySelector('.closeButtonCreer');
    const formulaireContact = document.querySelector('.formulaireCompteCreer');
    const formulaireNone = document.querySelector('.formulaireNoneCreer');
    const boutonContact = document.querySelector('.boutonContactCreer');
    let recupPrenom = document.querySelector('.prenomCreer');
    let recupNom = document.querySelector('.nomCreer');
    let recupEmail = document.querySelector('.emailCreer');
    let recuppasswordUser = document.querySelector('.passwordUserCreer');


    // reccupration de tous les paragraph des msg d'erreur
    const prenomAlert = document.querySelector('.prenomErreurCreer');
    const nomAlert = document.querySelector('.nomErreurCreer');
    const emailAlert = document.querySelector('.emailErreurCreer');
    const passwordUserAlert = document.querySelector('.passwordUserErreurCreer');
		//verificationChamps();

		//regex
		//verification et validation des champs du formulaire
		const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const regexpasswordUser = /^[A-Za-z0-9\s.,;:'"!?()-]*$/;

		const submitButton = document.querySelector('.submitButtonCreer');

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

			if (!regexpasswordUser.test(passwordUser.trim()) || passwordUser === "") {
				
				console.log("Test échoué");
				passwordUserAlert.style.display = "block";
				recuppasswordUser.style.border = "2px solid red";
			
			} else {

				console.log("Test réussi");
				passwordUserAlert.style.display = "none";
				recuppasswordUser.style.border = "2px solid black";
			}



		//////////////////////////

		//vidage des champs apres le mascage du formulaire
		//formulaireContact.reset();

		const userObject = {
			prenom: prenom,
      nom: nom,
      email: email,
      password: passwordUser
		};

		console.log("***userObject final");
		console.log(userObject);

		if (emailRegex.test(email.trim()) && email !== "" 
			&& regexNomPrenom.test(prenom.trim()) && prenom !== ""
			&& regexNomPrenom.test(nom.trim()) && nom !== ""
			&& regexpasswordUser.test(passwordUser.trim()) && passwordUser !== ""
		){


			console.log("***** formulaire envoyé avec succès");

			
			//gestion de la requête d'envoie du formulaire
			userServices
				.addUser(userObject)
				.then( res => {
					
					//confirmationEleveCreate() 
					console.log("***** utilisateur crée avec succès")

				})
				.catch( err => {

					//setclassExist(`Vous ne pouvez pas créer l'élève ${nom} car il existe déjà` )
				
					console.log(` **** erreur de création de l'utilisateur : ` + err)
				
				
				})

			

			console.log("***** formulaire envoyé avec succès");

		

			//vidage des champs apres le mascage du formulaire
			formulaireContact.reset();

      setemail("")
      setnom("")
      setpasswordUser("")
      setprenom("")
			

			//formulaireNone.style.display= "none"

			//$$$$$$$$$$$$$$$$$$$
      lockSignum()

			//$$$$$$$$$$$$$$$$$$$



		}
	}

	///////////////////////////////////////////




  return (
    <div className="formulaireNoneCreer">
       <div className="formulaireContainerCreer">
          <div className="formulaireContenerFinalCreer">
              <form className="formulaireCompteCreer">
                  <div className="containerbuttonCreer">
                    <button className="closeButtonCreer" onClick={()=> lockSignum}>X</button>
                  </div>
                 
                  <h2>Créer un compte</h2>

                  <label htmlFor="prenom">Prénom :</label>
                  <p className="prenomErreurCreer">Veuillez correctement remplir le champ du prénom</p>
                  <input type="text" className="prenomCreer" name="prenom" placeholder="Prénom" />

                  <label htmlFor="nom">Nom :</label>
                  <p className="nomErreurCreer">Veuillez correctement remplir le champ du nom</p>
                  <input type="text" className="nomCreer" name="nom" placeholder="Nom" />

                  <label htmlFor="email">Email :</label>
                  <p className="emailErreurCreer">Veuillez correctement remplir le champ email</p>
                  <input type="email" className="emailCreer" name="email" placeholder="Email" />

                  <label htmlFor="password">mot de passe :</label>
                  <p className="passwordUserErreurCreer">Veuillez correctement remplir le champ du mot de passe</p>
                  <input type="password" className="telephoneCreer passwordUserCreer" name="password" placeholder="*******" />

                
              </form>
              <button  className="submitButtonCreer" onClick={() => submitForm()} >
                Valider
              </button>
          </div>
        </div>
      </div>

  );
};

export default AddAcount;
