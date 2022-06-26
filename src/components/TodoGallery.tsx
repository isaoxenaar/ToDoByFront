import { listenerCount } from "process";
import React, { FC, useEffect, useState } from "react";
import "../CSS/ToDoGallery.css";
import { ListType } from "../Types/ListType";
import { ToDoType } from "../Types/ToDoType";
import ToDoCard from "./ToDoCard";

interface IProps {
    id:ListType
}
 
const ToDoGallery:FC<IProps> = ({id}) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<ListType>({id: 0, title: "", totalcost: 0, todoitems: [], userId: 0})
    console.log(id + "this is id")

    const fetchList = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: null
        };
        const request = await fetch(`https://todoby.azurewebsites.net/api/List/${id.id}`, requestOptions);
        const response = await request.json();
        console.log(response);
        setList(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchList();
    }, [loading])

        if(loading)
            return <section className="ToDoGallery--loading">loading in todogallery</section>
        return (
            <section className="ToDoGallery--main">
            {id.title}
            <ul>{id.todoitems.map((todo:ToDoType) => {
            return <li>{todo.title}</li>
            })
        }</ul>
            </section>
        )
}

export default ToDoGallery;

//see to do cards. 
//see list title as header.
//create to do.
//drag and drop. 
//filter done and not done. 
//total cost card. 