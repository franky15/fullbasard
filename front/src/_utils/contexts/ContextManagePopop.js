import React, { createContext, useContext, useState } from 'react';

//creation du context
const createContextPopop = createContext()

const ManagePopopContextFunction = ({children}) => {

    //gestion des states des popops des articles
    const [ isOpenPopopArticle, setIsOpenPopopArticle ] = useState(false)
    const openPopopArticle =() => {

         setIsOpenPopopArticle(true) 

        //exécution d'une fonction après 10 secondes
		setTimeout( () => {
			setIsOpenPopopArticle(false)
		}, 9000)
    }
    const lockPopopArticle =() => { setIsOpenPopopArticle(false) }

    //gestion  du state du message de la popop
	const [messageNotificationArticle, setmessageNotificationArticle] = useState('');
	
	const handleMessageNotificationArticle = (dataMessage) => {
		
		setmessageNotificationArticle(dataMessage)
		
	
	}

    return (
        <createContextPopop.Provider value={{ isOpenPopopArticle, openPopopArticle, lockPopopArticle, messageNotificationArticle, handleMessageNotificationArticle }}>
            {children}
        </createContextPopop.Provider>
    );
};

//Attention c'est essential de retourner ce context bien précise car c'est lui qu'on récupèrera dans les autres composants qui en ont besoin
const useContextPopop = () => {

    return useContext(createContextPopop);
  };
  
  export { ManagePopopContextFunction, useContextPopop };
