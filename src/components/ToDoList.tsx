import React, {useEffect, useState} from "react";
import { ToDo } from "../Types/ToDo";

const List = () => {
    const [todos, setToDos] = useState<ToDo[]>();
    // const header = new Headers({ "Access-Control-Allow-Origin": "*" });
    // const requestOptions = {
    //     headers: { "Access-Control-Allow-Origin": "*" },
    // };
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
            return <div>hej</div>
        return (
            <div>{todos.map(td => <p>{td.title}</p>)}</div>
        )
}

export default List;