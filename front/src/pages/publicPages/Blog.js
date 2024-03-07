import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { articleServices } from "../../_services/Article.services";

const Blog = () => {

	const [ articles, setArticles ] = useState([])

	let navigate = useNavigate()

	

	//useEffect va se charger après que le contenu jsx se soit chargé
	useEffect( () => {

		//récupération de tous les articles 
		articleServices.getArticles()
			.then( function(res){

				console.log("*** res getArticles")
				console.log(res.data)

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
	
	return (
		
		<div className="blogBloc">

			<h1 className="h1articlesBloc">Articles</h1>
			<section className="publicationBloc"  >
			{	articles.map( (article, index) => 

				<button className="articleBloc" key={`${article.title}-${index}`}>
					<h2 className="titreArticleBloc">{article.title}</h2>
				</button>
				
				)
				

			}
			</section>

			
		</div>

	);
};

export default Blog;
