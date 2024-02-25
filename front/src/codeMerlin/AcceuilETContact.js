
export default AcceuilEtContact = () => {




        const closeButton = document.querySelector('.closeButton');
        const formulaireContact = document.querySelector('.formulaireContact');
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

        /******display none sur le formulaire sur le click de la croix rouge: MERLIN*/

        function fermetureFormulaireContact() {

            closeButton.addEventListener("click", function() {
                
                console.log("Formulaire contact affiché ");
                formulaireNone.style.display= "none"

            });


        }

        fermetureFormulaireContact(); 

        /******afficher le formulaire sur le click du button: MERLIN*/

        function affichFormulaireContact() {

            boutonContact.addEventListener("click", function() {
                
                console.log("Formulaire contact affiché ");
                formulaireNone.style.display= "block"

            });


        }

        affichFormulaireContact();


        /******création d'un objet représentant une personn: MERLIN*/

        const personne = {
            prenom: '',
            nom: '',
            email: '',
            message: ''
            
        };


        //reccuperation de tous les champs de tous les formulaires


        // fonction de gestion des valeurs du formulaire
        function gestionValForm () {



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
        
            // mascage de l'alert du champs prenom
            prenomAlert.style.display= "none"
            recupPrenom.style.border = '2px solid black';
            // Afficher la valeur dans la console
            console.log('Valeur actuelle du champ :', inputValuePrenom);
            
            console.log(personne)
            
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
            nomAlert.style.display= "none"
            recupNom.style.border = '2px solid black';
            // Afficher la valeur dans la console
            console.log('Valeur actuelle du champ :', inputValueNom);
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
            emailAlert.style.display= "none"
            recupEmail.style.border = '2px solid black';
            // Afficher la valeur dans la console
            console.log('Valeur actuelle du champ :', inputValueEmail);
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
            messageAlert.style.display= "none"
            recupMessage.style.border = '2px solid black';
            // Afficher la valeur dans la console
            console.log('Valeur actuelle du champ :', inputValueMessage);

        
        
            
        });


        }

        gestionValForm ();


        // envoie du formulaire
        function envoieFormulaire () {

            const submitButton = document.querySelector('.submitButton');

            submitButton.addEventListener ('click',function(event){
                
                //permet de choisir quand on envoie le formulaire
                event.preventDefault()
                
                console.log(personne)

                //verification et validation des champs du formulaire
                const regexNomPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                const regexMessage = /^[A-Za-z0-9\s.,;:'"!?()-]*$/;


                const prenomValObjet = personne.prenom
            
                
                if (!regexNomPrenom.test( prenomValObjet.trim()  )){

                
                    prenomAlert.style.display= "block"
                    recupPrenom.style.border = '2px solid red';
                    

                } else {
                
                    prenomAlert.style.display= "none"
                
                };


                console.log(personne);


                //control nom

                const nomValObjet = personne.nom
                
                if (!regexNomPrenom.test( nomValObjet.trim()  )){

                    
                    nomAlert.style.display= "block"
                    recupNom.style.border = '2px solid red';
                    

                } else {
                    
                    nomAlert.style.display= "none"
                
                };


                console.log(personne);


                // control email

                const emailValObjet = personne.email
                
                if (!emailRegex.test( emailValObjet.trim()  )){
                    
                    emailAlert.style.display= "block"
                    recupEmail.style.border = '2px solid red';
                    

                } else {
                    
                    emailAlert.style.display= "none"
                
                };


                console.log(personne);



                // control message

                const messageValObjet = personne.message
                console.log( !regexMessage.test(messageValObjet.trim())  )

                if (!regexMessage.test(messageValObjet) || messageValObjet === "" || messageValObjet === ""|| messageValObjet === " " ){
                
                    console.log("**testMessage")
                    messageAlert.style.display= "block"
                    recupMessage.style.border = '2px solid red';
                    

                } else {
                
                    messageAlert.style.display= "none"
                
                };


                console.log(personne);

                
                //fermeture du formulaire 
                if( regexNomPrenom.test( prenomValObjet.trim()) &&
                    regexNomPrenom.test( nomValObjet.trim()) && 
                    emailRegex.test( emailValObjet.trim()) &&
                regexMessage.test(messageValObjet.trim())
                ){

                    //reqet d'envoie de l'objet au back-end


                    
                    //vidage des champs apres le mascage du formulaire
                    formulaireContact.reset();

                    //formatage de l'objet personne
                    personne.prenom= "";
                    personne.nom= "";
                    personne.email= "";
                    personne.message= "";
                    

                    formulaireNone.style.display= "none"

                    

                }
                


            } )

        }

        envoieFormulaire ()

        
    }




        