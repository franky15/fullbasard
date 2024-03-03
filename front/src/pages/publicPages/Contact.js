import React from "react";

const Contact = ({lockContact}) => {
	return (
		<div className="Contact formulaireNone">
		<div className="formulaireContenerFinal">
		  <form className="formulaireContact">
			<button className="close-button closeButton" onClick={()=>lockContact()}>X</button>
			<h2>Ecrivez-Nous</h2>
  
			<label htmlFor="prenom">Prénom</label>
			<p className="prenomErreur">Veuillez correctement remplir le champ du prénom</p>
			<input type="text" className="prenom" name="prenom" placeholder="Prénom" />
  
			<label htmlFor="nom">Nom</label>
			<p className="nomErreur">Veuillez correctement remplir le champ du nom</p>
			<input type="text" className="nom" name="nom" placeholder="Nom" />
  
			<label htmlFor="email">Email</label>
			<p className="emailErreur">Veuillez correctement remplir le champ email</p>
			<input type="email" className="email" name="email" placeholder="Email" />
  
			<label htmlFor="message">Message</label>
			<p className="messageErreur">Veuillez correctement remplir le champ du message</p>
			<textarea className="message" name="message" placeholder="Message"></textarea>
  
			<input type="submit" className="submitButton" value="Envoyer" onClick={()=>lockContact()}/>
		  </form>
		</div>
	  </div>
	);
};

export default Contact;
