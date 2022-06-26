import React, { FC, useEffect, useState } from "react";
import "../CSS/ToDoGallery.css";
import { ToDoType } from "../Types/ToDoType";
import ToDoCard from "./ToDoCard";

interface IProps {
    id:number
}
 
const ToDoGallery:FC<IProps> = ({id}) => {
    const [todos, setToDos] = useState<ToDoType>();
    console.log(id + "this is id")
    

    useEffect(() => {
        fetchList();
    }, [])

        if(!todos)
            return <div>loading in todogallery</div>
        return (
            <section >{todos.map(td => <p>{td.title}</p>)}</section>
        )
}

export default ToDoGallery;

//see to do cards. 
//see list title as header.
//create to do.
//drag and drop. 
//filter done and not done. 
//total cost card. 