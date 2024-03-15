import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

//importation des contexts
import { useContextPopop } from "../../../_utils/contexts/ContextManagePopop"; 
import { useContextDatas } from "../../../_utils/contexts/ContextDatas";

import GetOneArticle from "./GetOneArticle";
import { Blog } from "../../publicPages";
import UpdateOneArticle from "./UpdateOneArticle";
import AddOnArticle from "./AddOnArticle";
import DeleteOneArticle from "./DeleteOneArticle";

const GetAllArticles = () => {

	let navigate = useNavigate()

	/*attention la donnée arrive de façon asynchrone donc le composant doit être rechargé pour afficher la donnée
		il faut donc conditionner l'utilisation des données du context au niveau de son existance de données
	*/
	let { dataArticlesContext, searchArticleListContext, setSearchArticleListContext } = useContextDatas();

	//context de la popop de notification d'articles
	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	const { isOpenPopopArticle, openPopopArticle,lockPopopArticle,messageNotificationArticle} = useContextPopop();
	
	let { id } = useParams();


	const currentURL = window.location.href;

	//gestion du state du bloc des boutons de gestion des articles
	const [ openBlocManageArticle, setopenBlocManageArticle ] = useState(false)

	//gestion du state de masquage des boutons modifier et supprimer
	const [ isOpenbtnArticle, setIsOpenbtnArticle ] = useState(false)
	const openBtnArticle = () => {setIsOpenbtnArticle(true)}
	const closeBtnArticle = () => {setIsOpenbtnArticle(false)}

	//////////////////////////////////////////////////

	//gestion du state de la liste des articles
	const [ articlesList, setArticlesList ] = useState([])

	
	//gestion du state de la barre de recherche
	//const [ inputSerchBar, setInputSerchBar ] = useState("Date de publication,Auteur...")

	//state de gestion du mot clé entré dans la barre de recherche
	const [ inputSearchBarArticles, setInputSearchBarArticles ] = useState({
		
		keyWordSearch: "Date de publication,Auteur..."
		
	})

	//fonction de mise à jour du state de la recherche d'articles lorsqu'on clique sur une catégorie
	const findArticles = ( keyWord) => {

		console.log("**** keyWord")

		//openSearchArticle()
		setInputSearchBarArticles({ 

			...inputSearchBarArticles,
			keyWordSearch: keyWord 
		})

		


	}

	//fonction de mise à jour du state de la recherche d'articles lorsqu'on entre un mot clé dans la barre de recherche
	let change = (e) => {

		console.log("**** keyWord sur change")

		//openSearchArticle()
		setInputSearchBarArticles({ 
			...inputSearchBarArticles,
			[e.target.name]: e.target.value
		})

		//////////////////////////////////////////////////
		
		//gestion du champ de recherche quand il est vide
		if( e.target.value === "" && (dataArticlesContext && dataArticlesContext.length > 0) ){

			console.log("*** la barre de recherche est vide")

			//mise à jour state de la recherche de l'article
			setArticlesList(dataArticlesContext)
		}
		//////////////////////////////////////////////////

	}
	
	console.log("**** articlesList")
	console.log(articlesList)

	console.log("**** inputSearchBarArticles")
	console.log(inputSearchBarArticles.keyWordSearch)

	//////////////////////////////////////////////////

	useEffect( () => {


		//affichage des boutons de gestion des articles ou pas en fonction de l'url
		if( currentURL.includes("visitor") ){

			setopenBlocManageArticle(false)
		}else{
			
			setopenBlocManageArticle(true)
		
		}


		if( !id  && currentURL.includes("admin") ){

			//setopenBlocManageArticle(true)
		
			closeBtnArticle()
		}else{
		
			openBtnArticle()
			
		
		}

		//////////////////////////////////////////////////

		//fonction du filtrage des articles en fonction de la catégorie ou du mot clé entré dans la barre de recherche
		const filterArticles = () => {

			console.log("**** ma fonction de filtrage") 

			//gestion de la recherche d'articles
			if( ( inputSearchBarArticles.keyWordSearch !== "Date de publication,Auteur..." && inputSearchBarArticles.keyWordSearch !== "") && (dataArticlesContext && dataArticlesContext.length > 0) ){  

				console.log("*** la barre de recherche n'est pas vide")
				console.log(dataArticlesContext)
				//ici la date est au format "2024-03-04T23:00:00.000Z" vu que la recherche par date se fait au format "2024-03-04" on fait donc un split pour récupérer la date
				const listFilterSearchBarArticle = dataArticlesContext.filter( (item) => item.author.toLowerCase().trim() === inputSearchBarArticles.keyWordSearch.toLowerCase().trim() || item.date.trim().split("T")[0] === inputSearchBarArticles.keyWordSearch.trim() )
				
				//mise à jour state de la recherche de l'article
				setArticlesList(listFilterSearchBarArticle)

				//redirection vers la page d'accueil en mettant à jour le context
				const searchArticleNavigate = () =>{

					//mise à jour de redirection en fonction de la recherche et du role de l'utilisateur
					if(currentURL.includes("visitor")){

						navigate('/visitor/blog/articles')
			
					}else if(currentURL.includes("admin")){
			
						navigate('/admin/blog/articles')
					}


				}
				//searchArticleNavigate()

			}else if( (dataArticlesContext && dataArticlesContext.length > 0) && (inputSearchBarArticles.keyWordSearch === "Date de publication,Auteur..." || inputSearchBarArticles.keyWordSearch === "") ){
			
				console.log("*** la barre de recherche est vide et  condition de départ")
				//fermeture du composant SearchComponent
				//closeSearchComponent()
				setArticlesList(dataArticlesContext)
			}

		}
		filterArticles()

		//////////////////////////////////////////////////


	},[id, currentURL, searchArticleListContext,dataArticlesContext,navigate, inputSearchBarArticles.keyWordSearch, setSearchArticleListContext])

	//state du composant GetAllArticles
	const [ openGetAllArticle, setOpenGetAllArticle] = useState(true) 
	const openopenGetAllArticle = () => {

		setOpenGetAllArticle(true)
		setAddArticle(false)
		setDeleteArticle(false)
	
	}
	const closeGetAllArticle = () => {setOpenGetAllArticle(false)}



	// state ajout d'un article
	const [ addArticle, setAddArticle ] = useState(false)
	const openAddArticle = () => {
		
		setAddArticle(true)
		setDeleteArticle(false)
		setEditArticle(false)
		setOpenGetAllArticle(false)
	}
	const closeAddArticle = () => {
		setAddArticle(false)
		setOpenGetAllArticle(true)
		//setDeleteArticle(false)
		//setEditArticle(false)

	}
		
	
	// state suppression d'un article
	const [ deleteArticle, setDeleteArticle ] = useState(false)
	const openDeleteArticle = () => {
		
		setDeleteArticle(true)
		setAddArticle(false)
		setEditArticle(false)
		setOpenGetAllArticle(true)
	
	}
	const closeDeleteArticle = () => {setDeleteArticle(false)}

	// state modification d'un article
	const [ editArticle, setEditArticle ] = useState(false)
	const openEditArticle = () => {

		setEditArticle(true)
		setAddArticle(false)
		//setDeleteArticle(false)
		setOpenGetAllArticle(false)
	
	}
	const closeEditArticle = () => {
		
		setEditArticle(false)
		setOpenGetAllArticle(true)
	
	}

	
	//state de gestion d'ouverture du composant GetOneArticle
	const [ isOpenGetOneArticle, setIsOpenGetOneArticle] = useState(false)
	const openGetOneArticle = () => {
		
		setIsOpenGetOneArticle(true)
	
	
	}
	const closeGetOneArticle = () => {setIsOpenGetOneArticle(false)}
	

	return (
		<>
		<div className="GetAllArticles">
			
			{	isOpenPopopArticle &&
				<p className="popopNotification" >{ messageNotificationArticle }</p>
			}
			<section className="blog">
				{
					openGetAllArticle && (dataArticlesContext && dataArticlesContext.length > 0) &&
						<div className="containerComponentBlog">
							<Blog articlesList={articlesList} dataArticlesContext={dataArticlesContext} openopenGetAllArticle={openopenGetAllArticle} /> { /*openGetOneArticle={openGetOneArticle} closeGetAllArticle={closeGetAllArticle} */} 
						</div>
				}

				{
					addArticle &&
					 <AddOnArticle closeAddArticle={closeAddArticle}  />
				}

				{	/*
					editArticle &&
					 <UpdateOneArticle closeEditArticle={closeEditArticle}  />
					*/
				}

				{/*
					isOpenGetOneArticle &&
					<GetOneArticle  dataArticlesContext={dataArticlesContext}  />
				*/
				}
		
				<section className="recherche">

					{
						openBlocManageArticle &&
						<div className="containerIcon">
						{
							addArticle ? <span className="iconAdmItem addArticles" ><i className="fa-solid fa-plus" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ closeAddArticle } ></i> </span>
							:
							<span className="iconAdmItem addArticles" ><i className="fa-solid fa-plus" onClick={ openAddArticle } ></i> </span>
						}
						{
							isOpenbtnArticle && (editArticle ? <span className="iconAdmItem editArticles" ><i className="fa-regular fa-pen-to-square" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ openEditArticle }></i> </span>
							:
							<span className="iconAdmItem editArticles" ><i className="fa-regular fa-pen-to-square" onClick={ openEditArticle }></i> </span>)
						}
						{
							isOpenbtnArticle && (deleteArticle ? <span className="iconAdmItem deleteArticles" ><i className="fa-solid fa-trash" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ openDeleteArticle }></i> </span>
							:
							<span className="iconAdmItem deleteArticles" ><i className="fa-solid fa-trash" onClick={ openDeleteArticle }></i> </span>)
						
						}
						</div>
							
					}	
					

					<div className="barREcherche">
						<button className="loupBoutton" onClick="clearSearch()">
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
						<input type="text" className="searchBar" name="keyWordSearch"  value={inputSearchBarArticles.keyWordSearch } onChange={change} />
						<button className="search-button"><i className="fa-solid fa-delete-left" onClick={() => setInputSearchBarArticles({ keyWordSearch: "" })} ></i></button>
						<div className="search-buttons"></div>
					</div>
					<section className="categories">
						
						<h2 className="category-title">Catégories</h2>
						<ul className="categories-list">
							<li className="category-item allArticles" onClick={ ()=> findArticles("Date de publication,Auteur...") }>Tous les articles</li>
							<li className="category-item ecommerce" onClick={ ()=> findArticles("ecommerce") }>E-commerce</li>
							<li className="category-item productOwner" onClick={ ()=> findArticles("productOwner") }>Product Owner</li>
							<li className="category-item devFront" onClick={ ()=> findArticles("deFront") }>Développeur Front-End</li>
							<li className="category-item devBack" onClick={ ()=> findArticles("devBack") }>Développeur Back-End</li>
							<li className="category-item devFull" onClick={ ()=> findArticles("devFull") }>Développeur Fullstack</li>
						</ul>
					</section>
				</section>
			

				
			</section>


		</div>
		
		{	/*
			<div className="containerDeleteUpdate">
				{deleteArticle && <DeleteOneArticle closeDeleteArticle= {closeDeleteArticle} openDeleteArticle={openDeleteArticle} />}

			</div>*/
		}
		</>
	);
};

export default GetAllArticles;
