
import Axios from "./Caller.services";

let getAllMessage = () =>{
    return Axios.get("/messages")  //routes du back
}

let getOneMessage = (id) =>{
    return Axios.get("/messages/" +id)  //routes du back
}

let updateMessage = (messageObject) => {
    return Axios.put("/messages/" +messageObject.id,  messageObject)  //on envoie user 
}

let deleteMessage = (id) => {
    return Axios.delete("/messages/" +id)  //on envoie user 
}

let addMessage = (messageObject) => {
    return Axios.post("/messages", messageObject)  //on envoie user 
}

export const classesServices = {
    getAllMessage, getOneMessage, updateMessage, deleteMessage, addMessage,
}