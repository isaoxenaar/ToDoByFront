import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import "../CSS/ListGallery.css";
import { ListType } from '../Types/ListType';
import { UserType } from '../Types/UserType';
import { ToDoType } from '../Types/ToDoType';
import ListCard from './ListCard'

interface IProps {
    id: number;
}

const ListGallery: FC<IProps> = ({id}) => {
    const [todos, setToDos] = useState<ToDoType[]>([{id: 0, title:"", text: "", deadline: "", cost: 0, done: false, subitems: [], tdListId: 0}]);
    const [lists, setLists] = useState<ListType[]>([{id: 0, title: "", totalcost: 0, todoitems: [], userId: 0}]);
    const [user, setUser] = useState<UserType>({id: 0, name: "", password: "", email: "", tdLists: []});
    const [newList, setNewList] = useState<ListType>({id: 0, title: "", totalcost: 0, todoitems: [], userId: 0});
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const request = await fetch(`https://todoby.azurewebsites.net/${id}`, requestOptions)
        const response = await request.json();
        setUser(response);
    }

    const fetchToDos = async () => {
        const request = await fetch("https://todoby.azurewebsites.net/api/ToDo")
        const response = await request.json();
        if(response.length > 1)
            setToDos(response);
        fetchLists();
    } 

    const fetchLists = async () => {
        const request = await fetch(`https://todoby.azurewebsites.net/api/List`)
        const response = await request.json();

        response.map((list: ListType) => {
            const todoitems = todos.filter((todo:ToDoType) => 
                todo.tdListId === list.id)
                if(todoitems.length > 0) {
                    list.todoitems = todoitems;
                }
                else {
                    list.todoitems = [{id: 0, title:"", text: "", deadline: "", cost: 0, done: false, subitems: [], tdListId: 0}];
                }
             return list;
        })
        if(id !== 0) {
            const byUser = await response.filter((li:ListType) => li.userId === id);
            if(byUser.length >= 1)
                setLists(byUser);
            user.tdLists = lists;
        }
        setLoading(false)
    }

    const createList = async (e:SyntheticEvent) => {
        e.preventDefault();
        const list = {title: newList.title, userId: id}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(list)
        };
        //const request = await fetch("https://localhost:7039/api/List", requestOptions)
        const request = await fetch("https://todoby.azurewebsites.net/api/List", requestOptions)
        console.log(request.json(), loading)
        setLoading(!loading);
    }

    useEffect( () => {
        console.log(loading, lists[0].id !== 0, lists[0].todoitems.length === 0)
        if(id > 0 ) {
            fetchUser();
        }
        fetchToDos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])            
        if(loading || (lists[0].id !== 0 && lists[0].todoitems.length === 0 )){
            return <div className="ListGallery--loading">loading in list</div>
        }
        return (
            <section className="ListGallery--main">
                <section className="ListGallery--intro"> Hej {user.name}! {lists[0].id === 0 ? "You have 0 lists, create the first one here" : "These are you current lists, do you need to add another one? That's possible.."}</section>
                <form className="ListGallery--form" onSubmit={createList}>
                    <input className="ListGallery--input" placeholder="title" onChange={e => setNewList({...newList, title: e.target.value})}/>
                    <button className="ListGallery--btn" type="submit">New List</button>
                </form>
                <section className="ListGallery--lists">
                    {lists[0].id === 0 ? <span></span> : lists.map(li => <ListCard list={li}/>)}
                </section>
            </section>
        )
}

export default ListGallery;
