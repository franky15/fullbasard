
import React,{useState} from "react";
import { Link } from "react-router-dom"

import { accountServices } from "../../_services/Account.services";

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

		//appel de la fonction deconnexion pour supprimer le token du localstorage
		accountServices.logout()
	}
	
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

	return (
		<div className="HeaderAdmin" >
			 <nav className="navbar" >
			 <Link to="/" className="logo"> <span className="colorLetter">F</span> ull<span className="colorLetter">B</span> asard</Link>
				<ul className="contenaireMenu" style={{ width: "20%"}}>
				
					{
						filAriane.isAccueil  ? (<li style={{ borderTop: "5px solid #2DBAEF", fontSize: "32px" }}><Link to="/admin/blog/articles" 
							onClick={ ()=> setFilAriane({
								...filAriane,isAccueil: true,isAbout: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})} >Accueil</Link></li>)
						:
						(<li><Link to="/admin/blog/articles" 
							onClick={ ()=> setFilAriane({
								...filAriane,isAccueil: true,isAbout: false,isContact: false,isBlog: false,isAddAcount: false,isLogin: false,
									
							})}>Accueil</Link></li>)
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
					<li className="boutonContact1 boutonConexion" onClick={() => logout()}><Link to="/"><i className="fa-solid fa-right-to-bracket"></i></Link></li>
					
				</ul>
			</nav>
			{ contactIsOpen && <Contact lockContact={lockContact} />}
			{ signumIsOpen && <AddAcount lockSignum={lockSignum} />}

		</div>
	);
};

export default HeaderAdmin;
