import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { articleServices } from "../../../_services/Article.services";
import { useContextPopop } from "../../../_utils/contexts/ContextManagePopop";
import { useContextDatas } from "../../../_utils/contexts/ContextDatas"; 

const UpdateOneArticle = ({closeEditArticle, dataFromChildSet}) => {

	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	const { isOpenPopopArticle, openPopopArticle,
		lockPopopArticle} = useContextPopop();

		console.log("**** isOpenPopopArticle")
		console.log(isOpenPopopArticle)

	const [ article, setArticle ] = useState({})


	//useEffect va se charger après que le contenu jsx se soit chargé
	useEffect( () => {

		//récupération d'un article 
		articleServices.getArticle()
			.then( function(res){

				console.log("*** res getArticle")
				console.log(res.data)

				const response = res.data

				//$$$$$$$$$$$$$$
				setArticle(response)
				//$$$$$$$$$$$$$$
			})
			.catch( function(err){

				console.log( "**** article non récupérés")
				console.log( err)

				///////////////////
				//ajout du code de la popop d'erreur

				///////////////////
			})
	

	},[])

	const articleFunction = (e) => {

		setArticle({
			...article,
			[e.target.name]: e.target.value
		})
	}

	console.log("**** article")	
	console.log(article)

	//soumission du formulaire
	let onsubmit = (e) => {

        e.preventDefault()
		console.log("**** article")
		console.log(article)

        articleServices.addArticle( article)
            .then( (res) => {

                console.log("**** res addArticle")
				console.log(res.data)
				
				// Fonction pour réinitialiser l'objet state
				const reinitialiserArticle = () => {
					setArticle({
					title: "Entrer le titre de l'article ",
					content: "Entrer le contenu de l'article",
					picture: "Insérer une image",
					author: "Entrer le nom de l'auteur",
					category: "Choisir une catégorie"
					});
				};
				reinitialiserArticle();
				
				
				//message de notification de l'ajout d'un article
				const message = "Votre article a bien été modifié avec succès"
				//mise à jour du state du message de notification dans le composant parent GetAllArticles
				dataFromChildSet(message)

				//fermeture du composant EditOneArticle
				closeEditArticle()
            })
            .catch((error) => console.log(error))
		
    }

	//fonction pour annuler l'ajout d'un article
	const cancelArticle = () => {

		// Fonction pour réinitialiser l'objet state
		const reinitialiserArticle = () => {
			setArticle({
			title: "Entrer le titre de l'article ",
			content: "Entrer le contenu de l'article",
			picture: "Insérer une image",
			author: "Entrer le nom de l'auteur",
			category: "Choisir une catégorie",
			date: "Entrer la date de publication"
			});
		};
		reinitialiserArticle();

		//fermeture du composant editOneArticle
		closeEditArticle()
	
	}

	return (
		<div className="UpdateOneArticle AddOnArticle">
			<div className='containerCreateArticle'>
				<p className='titlePageArticle'>modification de  l'article</p>

				<form className="articleForm">
						<label className="labelInputTitle">
							Titre *:
							<input
								type="text"
								value={article.title}
								name="title"
								className="inputTitle"
								onChange={articleFunction}
							/>
						</label>

						<label className="labelInputContent">
							Contenu *:
							<textarea
								value={article.content}
								name="content"
								className="inputContent"
								onChange={articleFunction}
							/>
						</label>

						<label className="labelInputAuthor">
							Auteur *:
							<input
								type="text"
								value={article.author}
								name="author"
								className="inputAuthor"
								onChange={articleFunction}
							/>
						</label>

						<label className="labelPicture">
							Image :
							<input type="file"  name="picture" className="picture" onChange={articleFunction} />
						</label>

						<label className="labelCategory">
							Catégorie *:
							<select value={article.category}  className="selectCreateArticle"  onChange={articleFunction}>
								
								{
									<option value="">Sélectionnez une catégorie</option>
									
								}
							
							</select>
						</label>

						<label className="labelDate">
							Date  de publication *:
							<input type="datetime-local"  name="date" className="date" onChange={articleFunction} />
						</label>

							<div className='containerBtnValidArticle'>

								<button  className='btnSubmitArticle btnArticle' onClick={onsubmit} >Valider</button>
								<button  className='btnCancelArticle btnArticle' onClick={cancelArticle}>Annuler</button>
							</div>
						
					</form>

			</div>
		</div>
	);
};

export default UpdateOneArticle;
