import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import { GetOneArticle } from "../adminPages/blog";
import { useContextDatas } from "../../_utils/contexts/ContextDatas"; 

const Blog = ({ articlesList}) => {  {/*,closeGetAllArticle, openGetOneArticle , dataArticlesContext, openopenGetAllArticle*/}

let { dataArticlesContext, searchArticleListContext, setSearchArticleListContext } = useContextDatas();

console.log("**** searchArticleListContext")
console.log(searchArticleListContext)

	let navigate = useNavigate()

	const currentURL = window.location.href;

	//state de gestion des données de recherche d'un article 
	//gestion du state de la recherche de l'article
   /* const [ inputSearchBarArticles, setInputSearchBarArticles ] = useState({keyWordSearch: "",})
    
	const setInputSearchBarArticlesFunction = (keyWordSearch) => {

		setInputSearchBarArticles({
			...inputSearchBarArticles,
			keyWordSearch: keyWordSearch
			
		})
	
	}

	console.log("**** inputSearchBarArticles")
	console.log(inputSearchBarArticles)*/


	//state de gestion d'ouverture de l'affichage de tous les articles
	const [ isOpenArticles, setIsOpenArticles] = useState(true)
	const openArticles = () => {

		setIsOpenArticles(true)
		//setIsOpenGetOneArticle(false)
	
	}
	const closeArticles = () => {setIsOpenArticles(false)}

	//state de mise à jour des articles
	const [ articles, setArticles ] = useState([])

	useEffect( () => {
		
		//récupération du champ de recherche
		let inputSearchBarArticles = document.querySelector(".searchBar")
//.toString()

		if( (dataArticlesContext && dataArticlesContext.length > 0) && ( searchArticleListContext.list.length  > 0  && searchArticleListContext.keyWordSearch  !== "" ) ){

			console.log("**** la recherche est  en cours")

			//inputSearchBarArticles.value = searchArticleListContext.keyWordSearch


			console.log("**** searchArticleListContext")
			console.log(searchArticleListContext)

			setArticles(searchArticleListContext.list)

			//const dataArticlesFilter = dataArticlesContext.filter( articleItem => articleItem.author.trim().toLowerCase() === inputSearchBarArticles.value.trim().toLowerCase()  || articleItem.date.toString().trim().split("T")[0] === inputSearchBarArticles.value.toString().trim() ) 
			//filtrae des articles en fonction du mot clé de recherche

			/*const dataArticlesFilter = dataArticlesContext.filter( articleItem => articleItem.author.trim().toLowerCase() === searchArticleListContext.keyWordSearch.trim().toLowerCase()  || articleItem.date.toString().trim().split("T")[0] === searchArticleListContext.keyWordSearch.toString().trim() ) 
			
			console.log("**** dataArticlesFilter")
			console.log(dataArticlesFilter)

			setArticles(dataArticlesFilter)*/

		}else if(dataArticlesContext && dataArticlesContext.length > 0 && ( searchArticleListContext.keyWordSearch === ""  && searchArticleListContext.list.length === 0 )){

			console.log("**** la recherche n'est pas en cours")

			//filtrage des articles en fonction du mot clé de recherche
			//const dataArticlesContextFilter = dataArticlesContext.filter( article => article.author.toLowerCase().includes(inputSearchBarArticles.keyWordSearch.toLowerCase()) || article.date.toString().split("T")[0].includes(inputSearchBarArticles.keyWordSearch.toString().toLowerCase()))
			//setArticles(dataArticlesContext)

			setArticles(articlesList)

			
			//fonction pour rediriger vers la page de tous  les articles en fonction du role 
			const returnALLArticleFunction = () => {

				if(currentURL.includes("visitor")){

					closeGetOneArticle()
					openArticles()
					//openopenGetAllArticle()
					
					navigate(`/visitor/blog/articles`)
				
					

				}else if(currentURL.includes("admin")){

					closeGetOneArticle()
					openArticles()
					//openopenGetAllArticle()
					
					navigate(`/admin/blog/articles`)
					
					
				}
			}
			//returnALLArticleFunction()


		}

		/*if((articlesList && articlesList.length > 0 ) ){

			//mise à jour du state des articles
			setArticles(articlesList)

			
		}*/


	},[articlesList, currentURL,dataArticlesContext,searchArticleListContext,navigate])


	//fonction pour rediriger vers la page de l'article en fonction du role 
	const articleFunction = (id) => {

		if(currentURL.includes("visitor")){

			openGetOneArticle()
			closeArticles()
			//closeGetAllArticle()
			navigate(`/visitor/blog/articles/${id}`)
		
			

		}else if(currentURL.includes("admin")){

			openGetOneArticle()
			closeArticles()
			//closeGetAllArticle()
			
			navigate(`/admin/blog/articles/${id}`)
			
			
		}
	}

	console.log("**** articles")
	console.log(articles)

	//state de gestion d'ouverture du composant GetOneArticle
	const [ isOpenGetOneArticle, setIsOpenGetOneArticle] = useState(false)
	const openGetOneArticle = () => {
		
		setIsOpenGetOneArticle(true)
	
	
	}
	const closeGetOneArticle = () => {setIsOpenGetOneArticle(false)}

	
	return (
		
		<div className="blogBloc">

			<h1 className="h1articlesBloc">Articles</h1>
			<section className="publicationBloc"  >

				{	( isOpenArticles && articles && articles.length > 0) && articles.map( (article, index) => 

					<div className="containerArticle" key={`${article.title}-${index}`}   style={{ backgroundImage: `url('../../images/newspaper.svg')` }} >
					<button className="articleBloc"  onClick={ () => articleFunction(article.id) }>
						<h2 className="titreArticleBloc">Titre: {article.title}</h2>
						<p className="contentArticleBloc">Auteur: {article.author}</p>
						<p className="contentArticleBloc">Date de publication :{article.date.toString().split("T")[0]}</p>

					</button>
					</div>
					
					)
					
					

				}



				{
					isOpenGetOneArticle && // (articles && articles.length > 0) &&
					<GetOneArticle articles={articles} closeGetOneArticle={closeGetOneArticle} openArticles={openArticles}  /> // setInputSearchBarArticlesFunction={  setInputSearchBarArticlesFunction }
					
				}
			</section>

			
		</div>

	);
};

export default Blog;
