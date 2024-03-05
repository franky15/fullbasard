
import Axios from "./Caller.services";

let getArticles = () =>{
    return Axios.get("/articles")  //routes du back
}

let getArticle = (id) =>{
    return Axios.get("/articles/" +id)  //routes du back
}

let updateArticle = (articlesObject) => {
    return Axios.put("/articles/" +articlesObject.id,  articlesObject)  //on envoie user 
}

let deleteArticle = (id) => {
    return Axios.delete("/articles/" +id)  //on envoie user 
}

let addArticle = (articlesObject) => {
    return Axios.post("/articles", articlesObject)  //on envoie user 
}

export const articleServices = {
    getArticles, getArticle, updateArticle, deleteArticle, addArticle,
}