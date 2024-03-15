
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import React,{useState} from "react";
import { Link } from "react-router-dom"

import { AddAcount } from "../../pages/publicPages";
import Login from "../../pages/auth/Login";
import {Contact }from "../../pages/publicPages";
 
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//import AcceuilETContact from "../../codeMerlin/AcceuilETContact";

const HeaderPublic = () => {

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

	//state de gestion du fil d'ariane
	const [ filAriane, setFilAriane ] = useState({

		isAccueil: true,
		isAbout: false,
		isContact: false,
		isBlog: false,
		isAddAcount: false,
		isLogin: false,
		isLogout: false,

	})

	//récupération de l'url courant
	const currentURL = window.location.href;
	//condition de gestion du fil d'ariane

	//gestion du state du formulaire de contact
	const [contactIsOpen,setContactIsOpen] = useState(false) 
	const lockContact = ()=> {setContactIsOpen(false)}
	const openContact = ()=>{

        setContactIsOpen(true)
		//fermeture des autres fenêtres
		lockConexion()
		lockSignum()

		setFilAriane({

			...filAriane,
			isContact: true,
			isLogin: false,
			isAccueil: false,
			isAbout: false,
			isBlog: false,
			isAddAcount: false, 

		})
    }
	

	//gestion du state du formulaire de connexion
	const [conexionIsOpen,setConexionIsOpen] = useState(false) 
	const lockConexion = ()=> {setConexionIsOpen(false)}
	const openConexion = ()=>{ 
		
		setConexionIsOpen(true)
		//fermeture des autres fenêtres
		lockSignum()
		lockContact()

		setFilAriane({

			...filAriane,
			isLogin: true,
			isAccueil: false,
			isAbout: false,
			isContact: false,
			isBlog: false,
			isAddAcount: false, 

		})
	}

	//gestion du state du formulaire de connexion
	const [signumIsOpen,setSignumIsOpen] = useState(false)
	const lockSignum = ()=> {setSignumIsOpen(false)}
	const openSignum = ()=>{

		setSignumIsOpen(true)

		//fermeture des autres fenêtres
		lockConexion()
		lockContact()

		setFilAriane({

			...filAriane,
			isAddAcount: true, 
			isContact: false,
			isLogin: false,
			isAccueil: false,
			isAbout: false,
			isBlog: false,
			

		})
	
	}

	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	return (
		
		<div className="HeaderPublic">

			 <nav className="navbar">

				<div className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</div>
				<ul className="contenaireMenu">
				
					{
						filAriane.isLogin  ? <li style={{ borderTop: "5px solid red" }}><Link to="/">Accueil</Link></li>
						:
						<li ><Link to="http://localhost:3001">Accueil</Link></li>
					}

					<li><Link to="/about">Qui sommes-nous</Link></li>
					{
						filAriane.isAbout  ? <li li style={{ borderTop: "5px solid red" }} ><Link to="/blog/articles">Blog</Link></li>
						:
						<li><Link to="http://localhost:3001/blog/articles">Blog</Link></li>
					
					}

					<li className="boutonContact" onClick={() => openContact()}><Link >Contact</Link></li>

					<li onClick={() => openSignum()}><Link >Créer un compte</Link></li>
					{	

						filAriane.isLogin  ? <li className="boutonContact boutonConexion" onClick={() => openConexion()}><Link ><i class="fa-solid fa-right-to-bracket"></i></Link></li>
						:
						<li className="boutonContact boutonConexion" onClick={() => openConexion()}><Link ><i class="fa-solid fa-right-to-bracket"></i></Link></li>


					}

				</ul>

			</nav>

			{/**$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
			{ contactIsOpen && <Contact lockContact={lockContact}  />}
			{ conexionIsOpen && <Login lockConexion={lockConexion} />}
			{ signumIsOpen && <AddAcount lockSignum={lockSignum} />}
			{/**$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}

		</div>
	);
};

export default HeaderPublic;
