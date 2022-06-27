import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { FileWatcherEventKind } from "typescript";
import "../CSS/ToDoGallery.css";
import { ListType } from "../Types/ListType";
import { ToDoType } from "../Types/ToDoType";
import ToDoCard from "./ToDoCard";

interface IProps {
    todoItem:ListType
}
 
const ToDoGallery:FC<IProps> = ({todoItem}) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<ListType>(todoItem);
    const [newToDo, setNewToDo] = useState<ToDoType>({id:0, title: "", text: "", subitems: [], deadline: "", cost: 0, done: false, tdListId: 0});
    // const [todos, setToDos] = useState<ToDoType[]>([{id:0, title: "", text: "", subitems: [], deadline: "", cost: 0, done: false, tdListId: 0}])

    // const fetchList = async () => {
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: null
    //     };
    //     const request = await fetch(`https://todoby.azurewebsites.net/api/List/${todoItem.id}`, requestOptions);
    //     const response = await request.json();
    //     setList(response);
    //     console.log(list);
    //     setLoading(false);
    // }

    const fetchToDos = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo")
        const response = await request.json();
        const newToDoItems = response.filter((todo:ToDoType) =>
                todo.tdListId === list.id
        )
        list.todoitems = newToDoItems;
        setLoading(false);
    } 

    const createToDo = async (e: SyntheticEvent) => {
        e.preventDefault();

        const todo = {title: newToDo.title, text: newToDo.text, deadline: newToDo.deadline, cost: newToDo.cost, tdListId: todoItem.id}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        };
        //const request = await fetch("https://localhost:7039/api/ToDo", requestOptions)
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo", requestOptions)
        const response = request.json()
        setLoading(false)
    }

    const toggleToDo = (el: ToDoType) : any => {
        console.log("in toggle" + el.id)
       list.todoitems.map((todo:ToDoType) => {
        console.log("in toggle1" + todo.done)
            if(todo.id == el.id)
                todo.done = !todo.done;
            console.log("in toggle2" + todo.done)
            return todo;
       })
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
            <span>{todoItem.title}</span>
            <form className="ListGallery--form" onSubmit={createToDo}>
                <input className="ListGallery--input" placeholder="title" onChange={e => setNewToDo({...newToDo, title: e.target.value})}/>
                <input className="ListGallery--input" placeholder="deadline" onChange={e => setNewToDo({...newToDo, deadline: e.target.value})}/>
                <input className="ListGallery--input" placeholder="text" onChange={e => setNewToDo({...newToDo, text: e.target.value})}/>
                <input className="ListGallery--input" placeholder="cost" onChange={e => setNewToDo({...newToDo, cost: parseInt(e.target.value)})}/>
                <button className="Listgallery--btn" type="submit">add item</button>
            </form>            
            {todoItem.todoitems.map((todo:ToDoType) => {
                return <ToDoCard toggle={toggleToDo} todo={todo}/>
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
//patch in backend. 
//