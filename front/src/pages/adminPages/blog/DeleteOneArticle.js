import React,{useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import { articleServices } from "../../../_services/Article.services";

import { useContextDatas } from "../../../_utils/contexts/ContextDatas";
import { useContextPopop } from "../../../_utils/contexts/ContextManagePopop";

const DeleteOneArticle = ({closeDeleteArticle}) => {

	//accès aux valeurs du context pour ouvrir et fermer la popop de notification d'articles
	const { openPopopArticle, handleMessageNotificationArticle} = useContextPopop();
	
	let navigate = useNavigate()

	let { id } = useParams();

		console.log("**** id")
		console.log(id)

		console.log(closeDeleteArticle)

	//fonctions de suppression d'un article
	const deleteOneArticle = () => {

		//fonctions de suppression d'un article
		articleServices.deleteArticle( id )
			.then( (res) => {
				
				console.log("**** article supprimé avec succès")
				console.log(res.data)

				//fermeture de la fenêtre de suppression d'article
				closeDeleteArticle();
				
				//message de notification de l'ajout d'un article
				const message = "L'article a été supprimé  avec succès"
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
				
				
			})
			.catch((error) => console.log(error))
	}

	return (
		<div className="DeleteOneArticle">
			<p className="confirmDeleteTitle">Êtes vous sûr de vouloir supprimer cet article?</p>
			<div className="cotainerConfirmDeleteBtn">

				<button className="confirmDeleteButton" onClick={  deleteOneArticle } >Valider</button>
				<button className="confirmDeleteButton cancelDeleteBtn" onClick={ closeDeleteArticle } >Annuler</button>
			</div>
		</div>
	);
};

export default DeleteOneArticle;
