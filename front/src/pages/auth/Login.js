import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({lockConexion}) => {

	let navigate = useNavigate();  //pour utiliser useNavigate


	return (
		<div className="Login">
			<h1>Login</h1>
			





<div class="formulaireNoneConnexion">
    <div class="formulaireContenerFinalConnexion">
    <form  class="formulaireConnexion">
        <button class="close-button closeButtonConex" >X</button>
        <h2>Bienvenue dans votre espace.</h2>
        <p>Veuillez saisir votre e-mail et mot de passe pour accéder à votre écran </p>

        <label for="e.mail"></label>
        <p class="emailConexErreur">Veillez correctement remplir le champs de l'e.mail</p>
        <input type="text" class="conexEmail" name="email" placeholder="Entrer votre e-mail" >

        <label for="motDePasse"></label>
        <p class="passeErreur">Veillez correctement remplir le champs du mot de passe</p>
        <input type="text" class="motDePasse" name="motDePasse" placeholder="Entrer votre mot de passe" >

        <input type="submit" class="submitButton"  value="Connexion">
    </form>
    </div>
</div>
		</div>
	);
};

export default Login;
