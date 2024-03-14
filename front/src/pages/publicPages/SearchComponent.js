import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { articleServices } from "../../_services/Article.services";
import { useContextPopop } from "../../_utils/contexts/ContextManagePopop";

const SearchComponent = () => {

	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	const { isOpenPopopArticle, openPopopArticle,
		lockPopopArticle,childData} = useContextPopop();

	const [ articles, setArticles ] = useState([])

	let navigate = useNavigate()

	

	//useEffect va se charger après que le contenu jsx se soit chargé
	useEffect( () => {

		//récupération de tous les articles 
		articleServices.getArticles()
			.then( function(res){

				const response = res.data

				//$$$$$$$$$$$$$$
				setArticles(response)
				//$$$$$$$$$$$$$$
			})
			.catch( function(err){

				console.log( "**** articles non récupérés")
				console.log( err)

				///////////////////
				//ajout du code de la popop d'erreur

				///////////////////
			})
	

	},[])

	console.log(articles)

	
	const currentURL = window.location.href;
	console.log(currentURL);

	const articleFunction = (id) => {

		//navigate(`/admin/blog/articles/${id}`)

		if(currentURL.includes("visitor")){

			navigate(`/visitor/blog/articles/${id}`)

		}else if(currentURL.includes("admin")){

			navigate(`/admin/blog/articles/${id}`)
		}
	}
	
	return (
		
		<div className="blogBloc">

			{	isOpenPopopArticle && 
				<p className="popopNotification">{childData}</p>

			}
			<h1 className="h1articlesBloc">Articles</h1>
			<section className="publicationBloc"  >
			{	articles.map( (article, index) => 

				<button className="articleBloc" key={`${article.title}-${index}`} onClick={ () => articleFunction(article.id) }>
					<h2 className="titreArticleBloc">{article.title}</h2>
				</button>
				
				)
				

			}
			</section>

			
		</div>

	);
};

//export default SearchComponent;
