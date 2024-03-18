import React,{useState} from "react";
import { Link } from "react-router-dom"


import {Contact }from "../../pages/publicPages";
import { accountServices } from "../../_services/Account.services";


const HeaderPublicAdmin = () => {

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

    //gestion du state du formulaire de contact
	const [contactIsOpen,setContactIsOpen] = useState(false)
	const lockContact = ()=> {setContactIsOpen(false)}

	const openContact = ()=>{

        
        /*const formulaireNone = document.querySelector(".formulaireNone")
        formulaireNone.style.display= "none"*/
        setContactIsOpen(true)
    }


    //gestion de  la connexion
	const logout = ()=>{

		//appel de la fonction deconnexion pour supprimer le token du localstorage
		accountServices.logout()
	}

    return (
        <div className='HeaderPublicAdmin'>
             <nav className="navbar">
				<Link to="/" className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</Link>
				<ul className="contenaireMenu" style={{ width: "40%"}}>
				
					{
						filAriane.isAccueil  ? (<li style={{ borderTop: "5px solid #2DBAEF", fontSize: "32px" }}><Link to="/visitor/blog/articles" 
							onClick={ ()=> setFilAriane({
								...filAriane,isAccueil: true,isAbout: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})} >Accueil</Link></li>)
						:
						(<li><Link to="/visitor/blog/articles" 
							onClick={ ()=> setFilAriane({
								...filAriane,isAccueil: true,isAbout: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Accueil</Link></li>)
					}

					{
						filAriane.isAbout ? (<li  style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }}><Link to="/visitor/blog/about"
							onClick={ ()=> setFilAriane({
								...filAriane,isAbout: true,isAccueil: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Qui sommes-nous</Link></li>)
						
							:
							(<li><Link to="/visitor/blog/about"
							onClick={ ()=> setFilAriane({
								...filAriane,isAbout: true,isAccueil: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Qui sommes-nous</Link></li>)
						
					}
			
					{/*<li><Link to="/visitor/blog/articles">Blog</Link></li>*/}
					
					{		
						filAriane.isContact ? (<li className="boutonContact1" style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }} 
							onClick={ ()=> {
								
								openContact()
								setFilAriane({
								...filAriane,isContact: true,isAbout: false,isAccueil: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}}><Link >Contact</Link></li>)
							:
							(<li className="boutonContact1" 
							onClick={ ()=> {

								openContact()
								setFilAriane({ 
								...filAriane,isContact: true,isAbout: false,isAccueil: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}}><Link >Contact</Link></li>)
					
					
					}

					{/*
						
						filAriane.isLogin ? (
							<li className="boutonContact1 boutonConexion" style={{ borderTop: "5px solid #2DBAEF", fontSize: "40px" }} 
								onClick={() => {
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
									//openConexion();
									setFilAriane({
										...filAriane,isAddAcount: true,isLogin: false,isContact: false,isAbout: false,isAccueil: false,isBlog: false,	isAddAcount: false,
									});
										
								}}
							><Link ><i class="fa-solid fa-user-plus"></i></Link>
										
							</li>
						)

					*/
					
					}


					
					<li className="boutonContact1 boutonConexion" onClick={() => logout()}><Link to="/"><i className="fa-solid fa-right-to-bracket"></i></Link></li>

				</ul>

			</nav>
			{ contactIsOpen && <Contact lockContact={lockContact} />}

        </div>
    );
};

export default HeaderPublicAdmin;