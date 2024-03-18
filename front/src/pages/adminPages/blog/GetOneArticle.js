import React,{useState, useEffect} from "react";
import { useParams,useNavigate  } from "react-router-dom";

import { articleServices } from "../../../_services/Article.services";

//import du contexts
import { useContextDatas } from "../../../_utils/contexts/ContextDatas";
import { useContextPopop } from "../../../_utils/contexts/ContextManagePopop";

import AddOnArticle from "./AddOnArticle";
import UpdateOneArticle from "./UpdateOneArticle";
import DeleteOneArticle from "./DeleteOneArticle";

import  GetAllArticles  from "./GetAllArticles"; 


const GetOneArticle = ({setInputSearchBarArticlesFunction, closeGetOneArticle, openArticles }) => {



	let navigate = useNavigate()

	/*attention la donnée arrive de façon asynchrone donc le composant doit être rechargé pour afficher la donnée
		il faut donc conditionner l'utilisation des données du context au niveau de son existance de données
	*/
	let { dataArticlesContext, searchArticleListContext, setSearchArticleListContext } = useContextDatas();


	//context de la popop de notification d'articles
	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	let { isOpenPopopArticle, openPopopArticle,lockPopopArticle,messageNotificationArticle} = useContextPopop();
		
	
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
	const [ article, setArticle ] = useState({})

	
	//gestion du state de la barre de recherche
	//const [ inputSerchBar, setInputSerchBar ] = useState("Date de publication,Auteur...")

	//gestion du state de la liste des articles
	//const [ articlesList, setArticlesList ] = useState([])

	//////////////////////////////////:
	const [articleState, setArticleState] = useState({

		isAdding: false,
		isEditing: false,
		isDeleting: false,
		isGetOne: true,
		isComponentDelete: false,
		isOpenAllArticle: false,
		isGetAllArticle: false
	
  	});


	//////////////////////////////////:

	//state de gestion du mot clé entré dans la barre de recherche
	const [ inputSearchBarArticles, setInputSearchBarArticles ] = useState({
		
		keyWordSearch: "Date de publication,Auteur...",
		//articleListSearch: []
		
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
			//...inputSearchBarArticles,
			[e.target.name]: e.target.value
		})

		/*
		//mise à jour du state de l'affichage du composant GetAllArticles
		if( e.target.value !== "Date de publication,Auteur..." && e.target.value !== "" ){
		
		
			setArticleState({ ...articleState,isGetOne: false, isGetAllArticle: true })
		
		}*/

		
		
	}

	console.log("**** inputSearchBarArticles")
	console.log(inputSearchBarArticles)

	

	/*
	//fonction d'affichage de tous les articles
	const openGetAllArticle = () => {

		console.log("**** dataArticlesContext")
		console.log(dataArticlesContext)

		console.log("**** inputSearchBarArticles.keyWordSearch")
		console.log(inputSearchBarArticles.keyWordSearch)
		
		const lisArticleSearchBar = dataArticlesContext.filter( (item) => item.author.toLowerCase().trim() === inputSearchBarArticles.keyWordSearch.toLowerCase().trim() || item.date.trim().split("T")[0] === inputSearchBarArticles.keyWordSearch.trim() )
		
		console.log("**** lisArticleSearchBar")
		console.log(lisArticleSearchBar)

		if( (inputSearchBarArticles.keyWordSearch !== "Date de publication,Auteur...") && ( lisArticleSearchBar && lisArticleSearchBar.length > 0) ){

			setArticleState({ ...articleState,isGetOne: false, isOpenAllArticle: true })
			//openArticles()
			closeGetOneArticle()

			setInputSearchBarArticles({ 
				...inputSearchBarArticles,
				articleListSearch: lisArticleSearchBar
			})
		}
		
	}*/
	
	//fonction pour rediriger vers la page de l'article en fonction du role 
	const articleFunction = (id) => {


		if(currentURL.includes("visitor")  ){

			
			
			navigate(`/visitor/blog/articles/${id}`)
		
			

		}else if(currentURL.includes("admin") ){
			
			
			navigate(`/admin/blog/articles/${id}`)
			
			
		}
	}
	
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

			
			//gestion de la l'article de départ
			if(dataArticlesContext && dataArticlesContext.length > 0 ){  //&& inputSearchBarArticles.keyWordSearch === "Date de publication,Auteur..."

				const articleInit = dataArticlesContext.find( (item) => item.id === parseInt(id) )
				

				setArticle(
					articleInit
				)


			}

		}
		filterArticles()

		//////////////////////////////////////////////////

		//fonction pour rediriger vers la page de l'article en fonction du role 
		const articleFunction = () => {

			console.log(inputSearchBarArticles.keyWordSearch )

			if(currentURL.includes("visitor") &&  inputSearchBarArticles.keyWordSearch !== "Date de publication,Auteur..." &&  inputSearchBarArticles.keyWordSearch !== "" ){

				/*
				setSearchArticleListContext({
					//...searchArticleListContext,
					keyWordSearch: inputSearchBarArticles
				})
				navigate(`/visitor/blog/articles`)
				*/
				
				//fitrage des articles en fonction du mot clé de recherche
				let listArticles = dataArticlesContext.filter( (item) => item.author.toLowerCase().trim() === inputSearchBarArticles.keyWordSearch.toLowerCase().trim() || item.date.toString().trim().split("T")[0] === inputSearchBarArticles.keyWordSearch.toString().toLowerCase().trim() )

				console.log("**** listArticles")
				console.log(listArticles)

				setSearchArticleListContext({
					...searchArticleListContext,
					list: listArticles,
					keyWordSearch: inputSearchBarArticles.keyWordSearch
				})
				//setSearchArticleListContext(listArticles)

				navigate(`/visitor/blog/articles`)
				//window.location.reload();

			}else if(currentURL.includes("admin")  && inputSearchBarArticles.keyWordSearch !== "Date de publication,Auteur..." &&  inputSearchBarArticles.keyWordSearch !== ""  ){
				/*
				setSearchArticleListContext({
					//...searchArticleListContext,
					keyWordSearch: inputSearchBarArticles
				})
				navigate(`/admin/blog/articles`)
				*/

					//fitrage des articles en fonction du mot clé de recherche
					let listArticles = dataArticlesContext.filter( (item) => item.author.toLowerCase().trim() === inputSearchBarArticles.keyWordSearch.toLowerCase().trim() || item.date.toString().trim().split("T")[0] === inputSearchBarArticles.keyWordSearch.toString().toLowerCase().trim() )

					console.log("**** listArticles")
					console.log(listArticles)
				
					setSearchArticleListContext({
						...searchArticleListContext,
						list: listArticles,
						keyWordSearch: inputSearchBarArticles.keyWordSearch
					})

					navigate(`/admin/blog/articles`)

					//window.location.reload();
			
			}


		}
		//articleFunction()
		

	},[inputSearchBarArticles, currentURL,id,dataArticlesContext,inputSearchBarArticles.keyWordSearch,searchArticleListContext,setSearchArticleListContext,navigate])

	console.log("**** searchArticleListContext")
	console.log(searchArticleListContext)

	/*
	//fonction d'affichage de tous les articles
	const openGetAllArticle = (e) => {

		console.log("**** dataArticlesContext")
		console.log(dataArticlesContext)

		console.log("**** inputSearchBarArticles.keyWordSearch")
		console.log(inputSearchBarArticles.keyWordSearch)

		console.log("**** e.target.value")
		console.log(e.target.value)
		
		const lisArticleSearchBar = dataArticlesContext.filter( (item) => item.author.toLowerCase().trim() === (e.target.value).toLowerCase().trim() || item.date.trim().split("T")[0] === inputSearchBarArticles.keyWordSearch.trim() )
		
		console.log("**** lisArticleSearchBar")
		console.log(lisArticleSearchBar)

		if( (inputSearchBarArticles.keyWordSearch !== "Date de publication,Auteur...") && ( lisArticleSearchBar && lisArticleSearchBar.length > 0) ){

			setArticleState({ ...articleState,isGetOne: false, isOpenAllArticle: true })
			//openArticles()
			//closeGetOneArticle()

			setInputSearchBarArticles({ 
				...inputSearchBarArticles,
				articleListSearch: lisArticleSearchBar
			})
		}
		
	}*/
	// openGetAllArticle()

	//redirection vers la page de tous les articles
	const goAllArticlesFunction = () => {

		if(currentURL.includes("visitor")){

			navigate(`/visitor/blog/articles`)

		}else if(currentURL.includes("admin")){

			navigate(`/admin/blog/articles`)

		}
	}

	return (
		<>
		<div className="GetOneArticle">
			
			
			<div className="GetAllArticles">

				<section className="blog">
					
					{	(articleState.isGetOne && article)  &&
						<div className="containerGetOneArticle" style={{ marginTop: "60px" }} >
							<h1 className="containerGetOneArticleTitle">{article.title}</h1>
							<p className="containerGetOneArticleContent">{article.content}</p>
							<p className="containerGetOneArticleAuthor"> <span  style={{ fontWeight:"bold" }}>Auteur :</span> {  article.author}</p>
							<p className="containerGetOneArticleDate"><span  style={{ fontWeight:"bold" }}>Date de publication : </span>{ article.date ? (article.date).toString().split("T")[0]:  "date absente"  }</p>
							<p className="containerGetOneArticleCategory"><span  style={{ fontWeight:"bold" }}>categorie :</span>{article.category}</p>
						</div>
						

					}

					{	(articleState.isOpenAllArticle ) && ( inputSearchBarArticles.articleListSearch && inputSearchBarArticles.articleListSearch.length > 0) &&
						
						inputSearchBarArticles.articleListSearch.map( (articleItem, index) => 

						<button className="articleBloc" key={`${articleItem.title}-${index}`} onClick={ () => articleFunction(articleItem.id) }>
							<h2 className="titreArticleBloc">{article.title}</h2>
						</button>

						)

					}

					{	/*
						articleState.isGetAllArticle && (searchArticleListContext.list && searchArticleListContext.list.length > 0) && inputSearchBarArticles.keyWordSearch !== "Date de publication,Auteur..." &&
						<GetAllArticles/>*/
						/*
						articleState.isOpenAllArticle && (dataArticlesContext && dataArticlesContext.length > 0) &&
							<div className="containerComponentBlog">
								<Blog  dataArticlesContext={dataArticlesContext}  /> 
							</div>
							*/
					}

					{
						articleState.isAdding &&
						<AddOnArticle  closeAddArticle={
							() => setArticleState({ ...articleState,isGetOne: true, isAdding: false })
						}  />
					}

					{
						articleState.isEditing &&
						<UpdateOneArticle closeEditArticle={  //articleState.isEditing}  attention ici on passe une fonction et non une valeur
						
						() => setArticleState({ ...articleState,isGetOne: true, isEditing: false })
					}/>
						
					}



					{/*	articleState.isGetOne && article &&
						<div className="containerGetOneArticle">
							<h1 className="containerGetOneArticleTitle">{article.title}</h1>
							<p className="containerGetOneArticleContent">{article.content}</p>
							<p className="containerGetOneArticleAuthor"> <span  style={{ fontWeight:"bold" }}>Auteur :</span> {  article.author}</p>
							<p className="containerGetOneArticleDate"><span  style={{ fontWeight:"bold" }}>Date de publication : </span>{ article.date ? (article.date).toString().split("T")[0]:  "date absente"  }</p>
							<p className="containerGetOneArticleCategory"><span  style={{ fontWeight:"bold" }}>categorie :</span>{article.category}</p>
						</div>
					}

					{
						articleState.isAdding &&
						<AddOnArticle closeAddArticle={() => setArticleState({ ...articleState,isGetOne: true, isEditing: false })}  />
					}

					{
						articleState.isEditing &&
						<UpdateOneArticle closeEditArticle={() => setArticleState({ ...articleState,isGetOne: true, isEditing: false })}  />
						*/
					}

					<section className="recherche">
						

						{
							openBlocManageArticle &&
							<div className="containerIcon">
							{
								articleState.isAdding ? <span className="iconAdmItem addArticles" ><i className="fa-solid fa-plus" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ ()=> setArticleState({...articleState, isAdding: false,isGetOne: true, isEditing: false,isDeleting: false})  } ></i> </span>
								:
								<span className="iconAdmItem addArticles" ><i className="fa-solid fa-plus" onClick={ ()=> setArticleState({...articleState, isAdding: true,isGetOne: false, isEditing: false,isDeleting: false})  } ></i> </span>
							}
							{
								articleState.isEditing ? <span className="iconAdmItem editArticles" ><i className="fa-regular fa-pen-to-square" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={()=> setArticleState({...articleState, isEditing: false, isGetOne: true, isAdding: false, isDeleting: false}) }></i> </span>
								:
								<span className="iconAdmItem editArticles" ><i className="fa-regular fa-pen-to-square" onClick={ ()=> setArticleState({...articleState, isEditing: true,isGetOne: false, isAdding: false, isDeleting: false}) }></i> </span>
							}
							{
								articleState.isDeleting ? <span className="iconAdmItem deleteArticles" ><i className="fa-solid fa-trash" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ ()=> setArticleState({...articleState, isDeleting: false, isComponentDelete: false,  isAdding: false, isEditing: false})  }></i> </span>
								:
								<span className="iconAdmItem deleteArticles" ><i className="fa-solid fa-trash" onClick={ ()=> setArticleState({...articleState, isDeleting: true, isComponentDelete: true, isAdding: false, isEditing: false})  }></i> </span>
							
							}
							</div>
								
						}	


						{/*
							openBlocManageArticle &&
							<div className="containerIcon">
							{
								addArticle ? <span className="iconAdmItem addArticles" ><i className="fa-solid fa-plus" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ closeAddArticle } ></i> </span>
								:
								<span className="iconAdmItem addArticles" ><i className="fa-solid fa-plus" onClick={ openAddArticle } ></i> </span>
							}
							{
								editArticle ? <span className="iconAdmItem editArticles" ><i className="fa-regular fa-pen-to-square" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ closeEditArticle }></i> </span>
								:
								<span className="iconAdmItem editArticles" ><i className="fa-regular fa-pen-to-square" onClick={ openEditArticle }></i> </span>
							}
							{
								deleteArticle ? <span className="iconAdmItem deleteArticles" ><i className="fa-solid fa-trash" style={{ color: 'orange', transition: 'color 0.3s ease-in-out' }} onClick={ closeDeleteArticle }></i> </span>
								:
								<span className="iconAdmItem deleteArticles" ><i className="fa-solid fa-trash" onClick={ openDeleteArticle }></i> </span>
							
							}
							</div>
							*/	
						}	




						{/*<div className="barREcherche">
							<button className="loupBoutton" onClick="clearSearch()">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
							<input type="text" className="searchBar" name="keyWordSearch"  value={   inputSearchBarArticles.keyWordSearch  } onChange={  change } />
							<button className="search-button"><i className="fa-solid fa-delete-left" onClick={() => setInputSearchBarArticles({ keyWordSearch: "" })} ></i></button>
							<div className="search-buttons"></div>
						</div>*/}
						<section className="categories">
							
							{/*<h2 className="category-title">Catégories</h2>*/}
							<ul className="categories-list">
								{/*
								{
									(dataArticlesContext && dataArticlesContext.length > 0) && dataArticlesContext.map( (article, index) => 
										<li className="category-item" key={`${article.title}-${index}`} onClick={ ()=> findArticles(article.category) }>{article.ca}</li>
									)
								}
								<li className="category-item allArticles" onClick={ ()=> findArticles("Date de publication,Auteur...") }>Tous les articles</li>
								{
									(dataArticlesContext && dataArticlesContext.length > 0) && dataArticlesContext.map( (article, index) => 
										<li className="category-item" key={`${article.id}-${index}`} onClick={ ()=> findArticles(article.category) }>{article.category}</li>
									)
								}
								*/}
								<li className="category-item allArticles" onClick={ ()=> goAllArticlesFunction() } style={{fontSize: "32px" }} >Tous les articles</li>
							</ul>
							
							
							
						</section>

						

					</section>
				
				</section>


			</div>
			
		</div>

		
			
		{/*<div className="containerDelete">
		{	
			articleState.isDeleting && 

				<DeleteOneArticle closeDeleteArticle={() => setArticleState(articleState => ({
					...articleState,
					isComponentDelete: false,
					
				}))} />
		}
		</div>*/}

		{	
			articleState.isDeleting && 
			<div className="containerDelete">
			
				<DeleteOneArticle closeDeleteArticle={() => setArticleState({
					...articleState,
					isComponentDelete: false,
					isDeleting: false
					
				})} />
		
			</div>
		}
			
		</>
	);
};

export default GetOneArticle;
