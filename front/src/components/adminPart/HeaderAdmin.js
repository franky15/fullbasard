
import React,{useState} from "react";
import { Link } from "react-router-dom"

import { Contact } from "../../pages/publicPages";
import {AddAcount} from "../../pages/publicPages";

const HeaderAdmin = () => {

	//gestion du state du formulaire de contact
	const [contactIsOpen,setContactIsOpen] = useState(false)
	const lockContact = ()=> {setContactIsOpen(false)}
	const openContact = ()=>{setContactIsOpen(true)}

	//gestion du state du formulaire de connexion
	const [signumIsOpen,setSignumIsOpen] = useState(false)
	const lockSignum = ()=> {setSignumIsOpen(false)}
	const openSignum = ()=>{setSignumIsOpen(true)}

	//gestion de  la connexion
	const logout = ()=>{

		
	}
	

	return (
		<div className="HeaderAdmin">
			 <nav className="navbar">
				<div className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</div>
				<ul className="contenaireMenu">
				
					<li><Link to="/admin/blog/articles">Accueil</Link></li>
					<li onClick={() => openSignum()}><Link >Créer un compte</Link></li>
					<li className="boutonContact boutonConexion" onClick={() => logout()}><Link to="/">Déconexion</Link></li>
					
				</ul>
			</nav>
			{ contactIsOpen && <Contact lockContact={lockContact} />}
			{ signumIsOpen && <AddAcount lockSignum={lockSignum} />}

		</div>
	);
};

export default HeaderAdmin;
