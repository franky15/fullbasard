import React from "react";

const AddAcount = () => {
  return (
    <div className="formulaireNoneCreer">
        <div className="formulaireContenerFinalCreer">
            <form className="formulaireCompteCreer">
                <button className="close-button closeButtonCreer">X</button>
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

                <label htmlFor="telephone">Téléphone :</label>
                <p className="telErreurCreer">Veuillez correctement remplir le champ du téléphone</p>
                <input type="tel" className="telephoneCreer" name="telephone" placeholder="Téléphone" />

                <input type="submit" className="submitButtonCreer" value="Valider" />
            </form>
        </div>
      </div>

  );
};

export default AddAcount;
