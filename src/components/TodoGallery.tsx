import React, { FC, SyntheticEvent, useEffect, useState } from "react";
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
    const [newToDo, setNewToDo] = useState<ToDoType>({id:0, title: "", text: "", subitems: [], deadline: "", cost: 0, done: false, tdListId: 0});
    // const [todos, setToDos] = useState<ToDoType[]>([{id:0, title: "", text: "", subitems: [], deadline: "", cost: 0, done: false, tdListId: 0}])
    console.log(id + "this is id") 

    const fetchList = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: null
        };
        const request = await fetch(`https://todoby.azurewebsites.net/api/List/${id.id}`, requestOptions);
        const response = await request.json();
        setList(response);
        console.log(list);
        setLoading(false);
    }

    const fetchToDos = async () => {
        console.log("in fetch todos")
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo")
        const response = await request.json();
        console.log("todos" + response);
        const newToDoItems = response.filter((todo:ToDoType) =>
                todo.tdListId === id.id
        )
        id.todoitems = newToDoItems;
        setLoading(!loading)
    } 

    const createToDo = async (e: SyntheticEvent) => {
        e.preventDefault();

        const todo = {title: newToDo.title, text: newToDo.text, deadline: newToDo.deadline, cost: newToDo.cost, tdListId: id.id}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        };
        //const request = await fetch("https://localhost:7039/api/ToDo", requestOptions)
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo", requestOptions)
        const response = request.json()
        console.log(response)
        fetchToDos();
    }

    useEffect(() => {
        fetchList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

        if(loading)
            return <section className="ToDoGallery--loading">loading in todogallery</section>
        return (
            <section className="ToDoGallery--main">
            <span>{id.title}</span>
            <form className="ListGallery--form" onSubmit={createToDo}>
                    <input className="ListGallery--input" placeholder="title" onChange={e => setNewToDo({...newToDo, title: e.target.value})}/>
                    <input className="ListGallery--input" placeholder="deadline" onChange={e => setNewToDo({...newToDo, deadline: e.target.value})}/>
                    <input className="ListGallery--input" placeholder="text" onChange={e => setNewToDo({...newToDo, text: e.target.value})}/>
                    <input className="ListGallery--input" placeholder="cost" onChange={e => setNewToDo({...newToDo, cost: parseInt(e.target.value)})}/>
                    <button className="Listgallery--btn" type="submit">add item</button>
            </form>            
            {id.todoitems.map((todo:ToDoType) => {
                return <ToDoCard todo={todo}/>
            })}
            </section>
        )
}

export default ToDoGallery;

//check. see to do cards. 
//check. see list title as header.
//check. create to do.
//drag and drop. 
//filter done and not done. 
//total cost card. 