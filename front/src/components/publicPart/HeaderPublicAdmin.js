import React,{useState} from "react";
import { Link } from "react-router-dom"


import {Contact }from "../../pages/publicPages";

const HeaderPublicAdmin = () => {

    //gestion du state du formulaire de contact
	const [contactIsOpen,setContactIsOpen] = useState(false)
	const lockContact = ()=> {setContactIsOpen(false)}
	const openContact = ()=>{setContactIsOpen(true)}


    //gestion de  la connexion
	const logout = ()=>{

		
	}

    return (
        <div className='HeaderPublicAdmin'>
             <nav className="navbar">
				<div className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</div>
				<ul className="contenaireMenu">
				
					<li><Link to="/visitor/blog">Accueil</Link></li>
					<li><Link to="/visitor/about">Qui sommes-nous</Link></li>
					<li className="boutonContact" onClick={() => openContact()}><Link >Contact</Link></li>
                    <li className="boutonContact boutonConexion" onClick={() => logout()}><Link to="/acceuil">Déconexion</Link></li>

				</ul>
			</nav>
			{ contactIsOpen && <Contact lockContact={lockContact} />}

        </div>
    );
};

export default HeaderPublicAdmin;