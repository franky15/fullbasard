
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom"

import { AddAcount } from "../../pages/publicPages";
import Login from "../../pages/auth/Login";
import {Contact }from "../../pages/publicPages";
// import { use } from "../../../../back/app";
 
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

	console.log("**** filAriane")
	console.log(filAriane)

	//récupération de l'url courant
	const currentURL = window.location.href;

	console.log("**** currentURL")
	console.log(currentURL)
	//arrivée sur la page d'accueil
	/*
	useEffect( () => {

		if( currentURL === "http://localhost:3001/" ){

		console.log("****  on est à l' accueil")
		setFilAriane({

			...filAriane,
			isAccueil: true,
			isAbout: false,
			isContact: false,
			isBlog: false,
			isAddAcount: false,
			isLogin: false,
			isLogout: false,

		})

	
	}
	},[])*/

	//condition de gestion du fil d'ariane

	//gestion du state du formulaire de contact
	const [contactIsOpen,setContactIsOpen] = useState(false) 
	const lockContact = ()=> {setContactIsOpen(false)}
	const openContact = ()=>{

        setContactIsOpen(true)
		//fermeture des autres fenêtres
		lockConexion()
		lockSignum()

    }
	

	//gestion du state du formulaire de connexion
	const [conexionIsOpen,setConexionIsOpen] = useState(false) 
	const lockConexion = ()=> {setConexionIsOpen(false)}
	const openConexion = ()=>{ 
		
		setConexionIsOpen(true)
		//fermeture des autres fenêtres
		lockSignum()
		lockContact()

		
	}

	//gestion du state du formulaire de connexion
	const [signumIsOpen,setSignumIsOpen] = useState(false)
	const lockSignum = ()=> {setSignumIsOpen(false)}
	const openSignum = ()=>{

		setSignumIsOpen(true)

		//fermeture des autres fenêtres
		lockConexion()
		lockContact()

		
	
	}

	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	return (
		
		<div className="HeaderPublic">

			 <nav className="navbar">

				<Link to="/" className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</Link>
				<ul className="contenaireMenu">
				
					{
						filAriane.isAccueil  ? (<li style={{ borderTop: "5px solid #2DBAEF", fontSize: "32px" }}><Link to="/" 
							onClick={ ()=> setFilAriane({
								...filAriane,isAccueil: true,isAbout: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})} >Accueil</Link></li>)
						:
						(<li><Link to="/" 
							onClick={ ()=> setFilAriane({
								...filAriane,isAccueil: true,isAbout: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Accueil</Link></li>)
					}

					{
						filAriane.isAbout ? (<li  style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }}><Link to="/about"
							onClick={ ()=> setFilAriane({
								...filAriane,isAbout: true,isAccueil: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Qui sommes-nous</Link></li>)
						
							:
							(<li><Link to="/visitor/blog/about"
							onClick={ ()=> setFilAriane({
								...filAriane,isAbout: true,isAccueil: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Qui sommes-nous</Link></li>)
						
					}
			
					<li><Link to="/visitor/blog/articles">Blog</Link></li>
					
					{		
						filAriane.isContact ? (<li className="boutonContact1" style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }} 
							onClick={ ()=> setFilAriane({
								...filAriane,isContact: true,isAbout: false,isAccueil: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}><Link >Contact</Link></li>)
							:
							(<li className="boutonContact1" 
							onClick={ ()=> setFilAriane({
								...filAriane,isContact: true,isAbout: false,isAccueil: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}><Link >Contact</Link></li>)
					
					
					}

					{
						
						filAriane.isAddAcount ? (
							<li className="boutonContact1 boutonConexion" style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }} 
								onClick={() => {
									openSignum();
									//openConexion();
									setFilAriane({
										...filAriane,isAddAcount: true,isLogin: false,	isContact: false,isAbout: false,isAccueil: false,isBlog: false,	
									});
										
								}}
							><Link ><i class="fa-solid fa-user-plus"></i></Link>
										
							</li>
						) : (
							<li className="boutonContact1 boutonConexion" 
								onClick={() => {
									openSignum();
									//openConexion();
									setFilAriane({
										...filAriane,isAddAcount: true,isLogin: false,isContact: false,isAbout: false,isAccueil: false,isBlog: false,	isAddAcount: false,
									});
										
								}}
							><Link ><i class="fa-solid fa-user-plus"></i></Link>
										
							</li>
						)

					
					
					}


					{	

						filAriane.isLogin ? (
							<li className="boutonContact1 boutonConexion" style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }} 
								onClick={() => {
									openConexion();
									setFilAriane({
										...filAriane,isLogin: true,	isContact: false,isAbout: false,isAccueil: false,isBlog: false,	isAddAcount: false,
									});
										
								}}
							><Link ><i className="fa-solid fa-right-to-bracket"></i></Link>
										
							</li>
						) : (
							<li className="boutonContact1 boutonConexion" 
								onClick={() => {
									openConexion();
									setFilAriane({
										...filAriane,isLogin: true,	isContact: false,isAbout: false,isAccueil: false,isBlog: false,	isAddAcount: false,
									});
										
								}}
							><Link ><i className="fa-solid fa-right-to-bracket"></i></Link>
										
							</li>
						)



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
