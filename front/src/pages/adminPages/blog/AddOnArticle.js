import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { articleServices } from '../../../_services/Article.services'; 

import { useContextPopop } from '../../../_utils/contexts/ContextManagePopop'; 

import { useContextDatas } from '../../../_utils/contexts/ContextDatas';

const AddOnArticle = ({ closeAddArticle }) => {

	let navigate = useNavigate();

	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	const { openPopopArticle, handleMessageNotificationArticle} = useContextPopop();
		
	let { dataArticlesContext } = useContextDatas();

	//gestion du state des articles
	const [ dataArticles, setDataArticles ] = useState([])

	useEffect(() => {

		if(dataArticlesContext && dataArticlesContext.length > 0) {
			
			console.log("**** dataArticlesContext")
			console.log(dataArticlesContext)

			setDataArticles(dataArticlesContext)

		}

		const newCategory = document.querySelector(".inputNewCategory")
		newCategory.placeholder = "Entrez le nom de la nouvelle catégorie"//alueNewCategory

	}, [dataArticlesContext]);

	//state de l'objet article
	const [ article, setArticle ] = useState({

		title: "Entrer le titre de l'article ",
		content: "Entrer le contenu de l'article",
		picture: null,
		author: "Entrer le nom de l'auteur",
		category: "Choisir une catégorie",
		date: "Entrer la date de publication"

    })

	
	//creation d'un objet article
    let articleFunction = (e) => {

        setArticle({

            ...article,
            [e.target.name]: e.target.value
        })
    }

	const handleFileChange = (e) => {
        setArticle({ ...article, picture: e.target.files[0] });
    };

	//gestion des des deux champs catergories
	const newCategoryFunction = () => {

			//récupération des éléments
			const newCategory = document.querySelector(".inputNewCategory")
			const selectCategory = document.querySelector(".selectCreateArticle")

			//récupération de la valeur de l'élément
			let valueNewCategory = newCategory.value
			let valueSelectCategory = selectCategory.value
			
			if( valueNewCategory !== ""){

				//désactivation du champ de saisie de Newcatégorie
				selectCategory.disabled = true;
	
				setArticle({
					...article,
					category: valueNewCategory
				})
	
			}else if( valueNewCategory === ""){
	
				//désactivation du champ de sélection de la catégorie
				selectCategory.disabled = false;
	
				setArticle({
					...article,
					category: valueNewCategory
				})
			}

			
	}
	//categorieChoose()

	//fonction de reactivation des champs de catégories
	const newcategorieFunction2 = () => {

		//récupération des éléments
		const newCategory = document.querySelector(".inputNewCategory")
		const selectCategory = document.querySelector(".selectCreateArticle")

		
		//désactivation du champ de saisie de Newcatégorie
		newCategory.disabled = false;

		//désactivation du champ de sélection de la catégorie
		selectCategory.disabled = true;

	}


	//fonction de gestion des champs de catégories
	const categorieFunction = () => {

		
		//récupération des éléments
		const newCategory = document.querySelector(".inputNewCategory")
		const selectCategory = document.querySelector(".selectCreateArticle")

		//récupération de la valeur de l'élément
		let valueSelectCategory = selectCategory.value
		let valueNewCategory = newCategory.value

		console.log("**** valueSelectCategory existe")

		if( valueSelectCategory !== ""){

			//désactivation du champ de saisie de Newcatégorie
			newCategory.disabled = true;

			

			setArticle({
				...article,
				category: valueSelectCategory
			})

		}else if( valueSelectCategory === ""){

			//désactivation du champ de sélection de la catégorie
			newCategory.disabled = false;

			setArticle({
				...article,
				category: valueSelectCategory
			})
		}


	}


	//fonction de reactivation des champs de catégories
	const categorieFunction2 = () => {

		//récupération des éléments
		const newCategory = document.querySelector(".inputNewCategory")
		const selectCategory = document.querySelector(".selectCreateArticle")

		
		//désactivation du champ de saisie de Newcatégorie
		newCategory.disabled = true;
		newCategory.value = "Entrez le nom de la nouvelle catégorie"

		//désactivation du champ de sélection de la catégorie
		selectCategory.disabled = false;

	}

	console.log("**** article")	
	console.log(article)

	//gestion du state de l'alerte de l'existence du titre
	const [ alerteTitleExist, setAlerteTitleExist ] = useState(false)

	//soumission du formulaire
	let onsubmit = (e) => {

        e.preventDefault()

		////////////////////////
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

		//console.log("**** formData")
		//console.log(formData)
		/////////////////////////
        articleServices.addArticle(formData)  //article
            .then( (res) => {

				
				//message de notification de l'ajout d'un article
				const message = "Votre article a bien été crée avec succès"
				//mise à jour du state du message de notification dans le composant parent GetAllArticles
				handleMessageNotificationArticle(message)
				
				// fonction de navigation ,puis recharge de la page et enfin ouverture de la popop de notification
				const reloadAndNavigate = () => {

					// Change l'URL en utilisant navigate
					navigate('/admin/blog/articles')
				
					// Recharge la page actuelle
					window.location.reload();

					openPopopArticle()
				  };

				  reloadAndNavigate()

				  //confirmation de l'ajout d'un article
				  console.log(res.data)
				
				
            })
            .catch(error => { 

				console.log(error)

				//mise à jour du state de l'alerte de l'existence du titre
				setAlerteTitleExist(true)
			})

			
		
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

		//fermeture du composant AddOnArticle
		closeAddArticle()
	
	}

	

	return (
		<div className="AddOnArticle">
			<div className='containerCreateArticle'>

				{	alerteTitleExist &&
					<p className='titlePageArticle' style={{ color: "red"}}>Ce titre existe déjà veillez modifier le titre de cet article</p>
				}

				<p className='titlePageArticle'>Créez votre article</p>

				<form className="articleForm" enctype="multipart/form-data">
					<label className="labelInputTitle">
						Titre *:
						<input
							type="text"
							value={article.title}
							name="title"
							className="inputTitle"
							onChange={(e) =>articleFunction(e)}
						/>
					</label>

					<label className="labelInputContent">
						Contenu *:
						<textarea
							value={article.content}
							name="content"
							className="inputContent"
							onChange={(e) =>articleFunction(e)}
						/>
					</label>

					<label className="labelInputAuthor">
						Auteur *:
						<input
							type="text"
							value={article.author}
							name="author"
							className="inputAuthor"
							onChange={(e) =>articleFunction(e)}
						/>
					</label>

					<label className="labelPicture">
						Image :
						<input type="file"  name="picture" accept="image/*" className="picture" onChange={(e) =>handleFileChange(e)} />
					</label>



				{	//isOpenNewCategory.isOpenNewCategory && 
					<label className="newCategory labelCategory labelNewCategorie2"   >
						Créer une nouvelle catégorie *:
						<input  type="text" name="newcategory" className="labelInputAuthor inputNewCategory" onClick={newcategorieFunction2}
							
							onChange={ () => {
								
								//articleFunction(); 
								newCategoryFunction();
								
								
							} } />
					</label>
				}
				{
					//isOpenNewCategory.isOpenCategory && 

					<label className="labelCategory labelCategorie2"   >
						Catégorie *:
						<select name="category" className="selectCreateArticle"  onChange={() => {
							//articleFunction(); 
							categorieFunction(); 
							}}>

							<option value="">Sélectionnez une catégorie</option>
							{
								(dataArticles && dataArticles.length > 0) && dataArticles.map((articleItem, index) => (
									<option value={articleItem.category} key={`${articleItem.category}-${index}`}>{articleItem.category}</option>
								))
							}
						</select>
				  </label>

					
					
				}

					<label className="labelDate">
						Date  de publication *:
						<input type="date"  name="date" className="date" onChange={articleFunction} />
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

export default AddOnArticle;
