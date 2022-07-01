import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import "../CSS/ToDoGallery.css";
import { ListType } from "../Types/ListType";
import { ToDoType } from "../Types/ToDoType";
import ToDoCard from "./ToDoCard";

interface IProps {
    listItem:ListType
}
 
const ToDoGallery:FC<IProps> = ({listItem}) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<ListType>(listItem);
    const [newToDo, setNewToDo] = useState<ToDoType>({id:0, title: "", text: "", subitems: [], deadline: "", cost: 0, done: false, tdListId: 0});

    const fetchToDos = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo")
        const response = await request.json();
        const newToDoItems = response.filter((todo:ToDoType) =>
                todo.tdListId === list.id
        )
        list.todoitems = newToDoItems;
        setList(list);
        setLoading(false);
    } 

    const createToDo = async (e: SyntheticEvent) => {
        e.preventDefault();

        const todo = {title: newToDo.title, text: newToDo.text, deadline: newToDo.deadline, cost: newToDo.cost, tdListId: listItem.id}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        };
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo", requestOptions)
        const response = request.json()
        console.log(response)
        setLoading(false)
    }

    const toggleToDo = async (el: ToDoType) => {
        el.done = !el.done;

        const patch = async(id:number, done:boolean) => {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(done)
            };
            const request = await fetch(`https://todoby.azurewebsites.net/api/ToDo/${el.id}`, requestOptions)
            const response = request.json();
            console.log(response);
        }
        await patch(el.id, el.done);
      setLoading(!loading);
    }

    useEffect(() => {
        fetchToDos();
        // fetchList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

        if(loading)
            return <section className="ToDoGallery--loading">loading in todogallery</section>
        return (
            <section className="ToDoGallery--main">
            <section className="ToDoGallery--title">{listItem.title}</section>
            <form className="ToDoGallery--form" onSubmit={createToDo}>
                <input className="ToDoGallery--input" placeholder="title" onChange={e => setNewToDo({...newToDo, title: e.target.value})}/>
                <input className="ToDoGallery--input" placeholder="deadline" onChange={e => setNewToDo({...newToDo, deadline: e.target.value})}/>
                <input className="ToDoGallery--input" placeholder="text" onChange={e => setNewToDo({...newToDo, text: e.target.value})}/>
                <input className="ToDoGallery--input" placeholder="cost" onChange={e => setNewToDo({...newToDo, cost: parseInt(e.target.value)})}/>
                <button className="ToDoGallery--btn" type="submit">new ToDo</button>
            </form>     
            <section className="ToDoGallery--grid">   
            {listItem.todoitems.map((todo:ToDoType) => {
                return <section className={todo.done?  "ToDoGallery--completed" : "ToDoGallery--notcompleted"} id={todo.id.toString()}><ToDoCard toggle={toggleToDo} todo={todo}/></section>
            })}
            </section>
            </section>
        )
}

export default ToDoGallery;

