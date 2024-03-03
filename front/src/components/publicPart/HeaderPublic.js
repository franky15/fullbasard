import React,{useState} from "react";
import { Link } from "react-router-dom"

import { AddAcount } from "../../pages/publicPages";
import Login from "../../pages/auth/Login";
import {Contact }from "../../pages/publicPages";
 

//import AcceuilETContact from "../../codeMerlin/AcceuilETContact";

const HeaderPublic = () => {

	//gestion du state du formulaire de contact
	const [contactIsOpen,setContactIsOpen] = useState(false)
	const lockContact = ()=> {setContactIsOpen(false)}
	const openContact = ()=>{setContactIsOpen(true)}

	//gestion du state du formulaire de connexion
	const [conexionIsOpen,setConexionIsOpen] = useState(false)
	const lockConexion = ()=> {setConexionIsOpen(false)}
	const openConexion = ()=>{  setConexionIsOpen(true)}

	//gestion du state du formulaire de connexion
	const [signumIsOpen,setSignumIsOpen] = useState(false)
	const lockSignum = ()=> {setSignumIsOpen(false)}
	const openSignum = ()=>{setSignumIsOpen(true)}

	
	return (
		<div className="HeaderPublic">
			 <nav className="navbar">
				<div className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</div>
				<ul className="contenaireMenu">
				
					<li><Link to="/">Accueil</Link></li>
					<li><Link to="/about">Qui sommes-nous</Link></li>
					<li><Link to="/blog/articles">Blog</Link></li>
					<li className="boutonContact" onClick={() => openContact()}><Link >Contact</Link></li>
					<li onClick={() => openSignum()}><Link >Créer un compte</Link></li>
					<li className="boutonContact boutonConexion" onClick={() => openConexion()}><Link to="login">connexion</Link></li>

				</ul>
			</nav>
			{ contactIsOpen && <Contact lockContact={lockContact} />}
			{ /*conexionIsOpen && <Login lockConexion={lockConexion} />*/}
			{ signumIsOpen && <AddAcount lockSignum={lockSignum} />}
		</div>
	);
};

export default HeaderPublic;
