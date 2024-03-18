import React,{useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { articleServices } from "../../../_services/Article.services";
import { useContextPopop } from "../../../_utils/contexts/ContextManagePopop";
import { useContextDatas } from "../../../_utils/contexts/ContextDatas"; 

const UpdateOneArticle = ({closeEditArticle, dataFromChildSet}) => {


	/*attention la donnée arrive de façon asynchrone donc le composant doit être rechargé pour afficher la donnée
		il faut donc conditionner l'utilisation des données du context au niveau de son existance de données
	*/
	let { dataArticlesContext, searchArticleListContext, setSearchArticleListContext } = useContextDatas();


	let { id } = useParams();

	const currentURL = window.location.href;

	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	const { isOpenPopopArticle, openPopopArticle,
		lockPopopArticle} = useContextPopop();

		console.log("**** isOpenPopopArticle")
		console.log(isOpenPopopArticle)

	const [ article, setArticle ] = useState({

		title: "Entrer le titre de l'article ",
		content: "Entrer le contenu de l'article",
		picture: "Insérer une image",
		author: "Entrer le nom de l'auteur",
		category: "Choisir une catégorie"
	})


	//useEffect va se charger après que le contenu jsx se soit chargé
	useEffect( () => {

		//récupération d'un article 
		articleServices.getArticle(id)
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

			//fonction de désactivation du champ date

			const  dateDisabled = () => {

				//récupération du champ date
				const date = document.querySelector(".labelDate")
				
				//désactivation du champ date
				date.disabled = true
				date.style.display = "none"

			}
			dateDisabled()
			
	

	},[id])

	const articleFunction = (e) => {

		setArticle({
			...article,
			[e.target.name]: e.target.value
		})
	}

	const handleFileChange = (e) => {
        setArticle({ ...article, picture: e.target.files[0] });
    };

	console.log("**** article")	
	console.log(article)

	//soumission du formulaire
	let onsubmit = (e) => {

        e.preventDefault()
		console.log("**** article")
		console.log(article)

		/*transformation des données en FormData car on a un fichier (image) dans l'objet article
		 cela entraine que l'objet article ne peut pas être envoyé directement il faut le transformer en FormData car c'est une donnée complexe
		*/
		const formData = new FormData();
		formData.append('title', article.title);
		formData.append('content', article.content);
		formData.append('picture', article.picture);
		formData.append('author', article.author);
		formData.append('category', article.category);
		formData.append('date', article.date);


        articleServices.updateArticle( formData) //article
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
				
				
				

				
            })
            .catch((error) => console.log(error))

			//message de notification de l'ajout d'un article
			const message = "Votre article a bien été modifié avec succès"
			//mise à jour du state du message de notification dans le composant parent GetAllArticles
			//dataFromChildSet(message)
			
			//fermeture du composant EditOneArticle
			closeEditArticle()

			//rechargement de la page
			window.location.reload()
		
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
		<div className="UpdateOneArticle AddOnArticle" enctype="multipart/form-data">
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
							<input type="file"  name="picture" accept="image/*" className="picture" onChange={ (e)=> handleFileChange(e)} />
						</label>

						<label className="labelCategory">
							Catégorie *:
							<select value={article.category}  className="selectCreateArticle"  onChange={  articleFunction}>
								
								{
									<option value="">{article.category} </option>
									
								}
							
							</select>
						</label>

						<label className="labelDate">
							Date  de publication *:
							<input type="date"  name="date" className="date" value={article.date} onChange={articleFunction} />
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
