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

	//gestion du state de l'existence du like
	const [ isheart, setIsheart ] = useState({
		like: 1,
		disLike: -1,
		normal: 0,
		opacityMax: 1,
		opacityMin: 0,
		time: 0.5,
		delay: "ease",
		heightMax: 40,
		show: true,
		//fontsizeMax: 30,
		//fontsizeMin: 0,
	})

	
	//NB : la méthode toggle() ajoute une classe si elle n'est pas présente, et la supprime si elle est présente.
	//mise à jour du state de l'existence du like
	const handleLike = (idHeart) => {

		console.log("**** clique sur le coeur dislike",  idHeart)

		//récupération de l'élément du coeur concerné
		const dislikeHeart = document.querySelector(`.dislike${idHeart}`)
		const likeHeart = document.querySelector(`.like${idHeart}`)
		 likeHeart.classList.toggle("animatelike")
		 dislikeHeart.classList.toggle("animatedislike")
	}

	//mise à jour du state de l'absece  du like
	const handleDislike = (idHeart) => {

		console.log("**** clique sur le coeur like",  idHeart)
	
		//récupération de l'élément du coeur concerné
		const dislikeHeart = document.querySelector(`.dislike${idHeart}`)
		const likeHeart = document.querySelector(`.like${idHeart}`)
		likeHeart.classList.toggle("animatelike")
		dislikeHeart.classList.toggle("animatedislike")
	}

	return (
		
		<div className="blogBloc">

			<h1 className="h1articlesBloc">Articles</h1>
			<section className="publicationBloc"  >

			{
				(isOpenArticles && articles && articles.length > 0) && articles.map((article, index) => (
					
						<button className="articleBloc" >
							<div className="containerArticle"  onClick={() => articleFunction(article.id)} key={`${article.title}-${index}`} style={{backgroundImage: `url(${article.picture})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
							<div className="containerArticleContent">
								<div className="containerArticleContentDetails">
									<h2 className="titreArticleBloc descriptionItem">Titre: {article.title}</h2>
									<p className="contentArticleBloc descriptionItem">Auteur: {article.author}</p>
									<p className="contentArticleBloc descriptionItem">Date de publication: {article.date.toString().split("T")[0]}</p>
								</div>
								<div className="containerArticleActions">
									<span className="commentArticleBloc" title="Commentez"><i class="fa-regular fa-comment"></i></span>

									<span className="likeArticleBloc" title="Likez">
									
								 	<i class={`fa-regular fa-heart dislike dislike${article.id}`} id={`${article.id}`} onClick={()=> { setIsheart({...isheart, show: false});  handleLike(article.id) } }  ></i>
											
									 <i class={ `fa-solid fa-heart like like${article.id}` } id={`${article.id}`} onClick={ ()=>{ setIsheart({...isheart, show: true}); handleDislike(article.id) } }  ></i>
								
									
									</span>
											

									
									<span className="numberlikeArticle" title="Nombre de like">{"10"}</span>
									
								</div>
							</div>
						</button>
					
				))
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
