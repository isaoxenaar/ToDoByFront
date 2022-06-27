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

        const todo = {title: newToDo.title, text: newToDo.text, deadline: newToDo.deadline, cost: newToDo.cost, tdListId: listItem.id}
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
            <span>{listItem.title}</span>
            <form className="ToDoGallery--form" onSubmit={createToDo}>
                <input className="ToDoGallery--input" placeholder="title" onChange={e => setNewToDo({...newToDo, title: e.target.value})}/>
                <input className="ListGallery--input" placeholder="deadline" onChange={e => setNewToDo({...newToDo, deadline: e.target.value})}/>
                <input className="ListGallery--input" placeholder="text" onChange={e => setNewToDo({...newToDo, text: e.target.value})}/>
                <input className="ListGallery--input" placeholder="cost" onChange={e => setNewToDo({...newToDo, cost: parseInt(e.target.value)})}/>
                <button className="Listgallery--btn" type="submit">add item</button>
            </form>            
            {listItem.todoitems.map((todo:ToDoType) => {
                return <section className={todo.done?  "ToDoGallery--completed" : "ToDoGallery--notcompleted"} id={todo.id.toString()}><ToDoCard toggle={toggleToDo} todo={todo}/></section>
            })}
            {/* {toDoList.map(el => {
            if(el.id === '')
                return <section id={v4()}></section>
            return <section className={el.done? "todo--completed" : "todo--notcompleted"} id={el.id}>
                        <Card removeHandler={removeHandler} doneHandler={doneHandler} toDo={el}/>
                </section>            
            }
        )} */}
            </section>
        )
}

export default ToDoGallery;

//check. see to do cards. 
//check. see list title as header.
//check. create to do.
//check. toggle done not done.
//filter done/not done.

//drag and drop. 
//total cost card. 
//create subs.
//make logout.
//fetch user through auth.
//css.