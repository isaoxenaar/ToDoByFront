import React, { useEffect, useState } from "react";
import { ToDoType } from "../Types/ToDoType";

const ToDoGallery = () => {
    const [todos, setToDos] = useState<ToDoType[]>();

    const fetchToDos = async () => {
        // const request = await fetch("https://localhost:7039/api/ToDo")
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo")
        const response = await request.json();
        console.log(response);
        setToDos(response);
    }

    useEffect(() => {
        fetchToDos();
    }, [])

        if(!todos)
            return <div>loading in todogallery</div>
        return (
            <div>todos: {todos.map(td => <p>{td.title}</p>)}</div>
        )
}

export default ToDoGallery;