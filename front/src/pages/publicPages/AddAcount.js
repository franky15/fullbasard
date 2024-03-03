import React from "react";

const AddAcount = () => {
  return (
    <div class="formulaireNoneCreer">
    <div class="formulaireContenerFinalCreer">
    <form  class="formulaireCompteCreer">
        <button class="close-button closeButtonCreer" >X</button>
        <h2>Créer un compte</h2>

        <label for="prenom"></label>
        <p class="prenomErreurCreer">Veillez correctement remplir le champs du prenom</p>
        <input type="text" class="prenomCreer" name="prenom" placeholder="Prénom" >

        <label for="nom"></label>
        <p class="nomErreurCreer">Veillez correctement remplir le champs du nom</p>
        <input type="text" class="nomCreer" name="nom" placeholder="Nom" >

        <label for="email"></label>
        <p class="emailErreurCreer">Veillez correctement remplir le champs email</p>
        <input type="email" class="emailCreer" name="email" placeholder="Email" >

        <label for="télépone"></label>
        <p class="telErreurCreer">Veillez correctement remplir le champs du prenom</p>
        <input type="number" class="telephoneCreer" name="telephone" placeholder="tèl" >


        <input type="submit" class="submitButtonCreer"  value="Valider">
    </form>
    </div>
</div>
  );
};

export default AddAcount;
