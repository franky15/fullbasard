import React, { createContext, useContext,useEffect, useState } from 'react';
import { articleServices } from '../../_services/Article.services';



//creation du context
const createContextDatas = createContext()

const ContextDatasFunction = ({children}) => {

    //gestion des states de la data  des articles
    const [ dataArticlesContext, setDataArticlesContext ] = useState([])

    /*
    //gestion du state de la recherche de l'article
    const [ searchArticleListContext, setSearchArticleListContext ] = useState({
       
            keyWordSearch: "Date de publication,Auteur...",
        }
    )*/
    //gestion du state de la recherche de l'article
    const [ searchArticleListContext, setSearchArticleListContext ] = useState({
        list: [],
        keyWordSearch: "",
    })

    //useEffect va se charger après que le contenu jsx se soit chargé
    useEffect( () => {

        
        //récupération de tous les articles 
        articleServices.getArticles()
            .then( function(res){

                //console.log("*** res getArticles")
                //console.log(res.data)

                const response = res.data

                //$$$$$$$$$$$$$$
                setDataArticlesContext(response)
                //$$$$$$$$$$$$$$
            })
            .catch( function(err){

                console.log( "**** articles non récupérés")
                console.log( err)

                ///////////////////
                //ajout du code de la popop d'erreur

                ///////////////////
            })

            //reception de la valeur du champ de recherche veant de GetOneArticle
            
            console.log("**** searchArticleListContext")
            console.log(searchArticleListContext)

    },[searchArticleListContext])

    return (
        <createContextDatas.Provider value={{dataArticlesContext, searchArticleListContext, setSearchArticleListContext }} > 
            {children}
        </createContextDatas.Provider>
    );
};

//Attention c'est essential de retourner ce context bien précise car c'est lui qu'on récupèrera dans les autres composants qui en ont besoin
const useContextDatas = () => {

    return useContext(createContextDatas);
  };
  
  export { ContextDatasFunction, useContextDatas };

export default { ContextDatasFunction, useContextDatas};