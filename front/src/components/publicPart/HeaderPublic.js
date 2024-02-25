import React,{useState} from "react";

import { AddAcount } from "../../pages/publicPages";

import AcceuilETContact from "../../codeMerlin/AcceuilETContact";

const HeaderPublic = () => {

	const [contactIsOpen,setontactIsOpen] = useState(false)

	const openContact = ()=>{

		setontactIsOpen(true)
	}

	

	//fonction de fermeture contact et ouverture
	AcceuilEtContact()
	
	return (
		<div className="HeaderPublic">
			 <nav class="navbar">
				<div class="logo"> <span class="colorLetter">F</span> ull<span class="colorLetter">B</span> asard</div>
				<ul class="contenaireMenu">
				
					<li><a href="#">Accueil</a></li>
					<li><a href="#">Qui sommes-nous</a></li>
					<li><a href="#">Blog</a></li>
					<li class="boutonContact" onClick={()=> AddAcount}><a href="#">Contact</a></li>
					
				</ul>
			</nav>
		</div>
	);
};

export default HeaderPublic;
